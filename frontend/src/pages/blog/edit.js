import React, { useEffect, useState, useMemo, useRef } from "react";
import server from "../../config/config";
import { canvasPreview } from "../../helpers/canvasPreview";
import { useDebounceEffect } from "../../helpers/useDebounceEffect";

import { Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Fade from "react-reveal/Fade";

import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// import "./custom-image-crop.css";

import { Link } from "react-router-dom";
import { SuccessText } from "../../components/successText";
import { ErrorText } from "../../components/errorText";
import { LoadingComponent } from "../../components/loadingComponent/loadingComponent";
import { BlogPost } from "../../components/blogPost";

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../App.css';
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export function EditBlogPostPage(props) {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");

    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [crop, setCrop] = useState({
        unit: '%',
        x: 0,
        y: 0,
        width: 100,
        height: 100
    });
    const [completedCrop, setCompletedCrop] = useState();
    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);

    const [content, setContent] = useState("");
    const [isDraft, setIsDraft] = useState(false);
    const [createdDate, setCreatedDate] = useState("");

    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone(
        {
            accept: { "image/*": [] },
            onDrop: acceptedFiles => handleOnDrop(acceptedFiles)
        });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const imageMaxSize = 1000000000; // bytes
    const acceptedFileTypes = "image/x-png, image/png, image/jpg, image/jpeg";
    const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() });

    useEffect(() => {
        const blogId = props.match.params.id;

        if (blogId) {
            setId(blogId);
            getBlogPost(blogId);
        }
        else
            setLoading(false);
    }, []);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"]
        ],
        imageResize: {
            modules: ["Resize", "DisplaySize"]
        }
    };

    const getBlogPost = (id) => {
        try {
            fetch(`${server.baseUrl}/blogs?id=${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        const blogPost = data.blogPost;

                        setTitle(blogPost.title);
                        setType(blogPost.type);
                        setImage(blogPost.image);
                        setImagePreview(blogPost.image);
                        setContent(blogPost.content);
                        setIsDraft(blogPost.isDraft);
                        setCreatedDate(blogPost.createdDate);
                    }
                    else {
                        console.log(`error : ${JSON.stringify(data)}`);
                        setError("Unable to retrieve blog post");
                    }
                })
                .catch(err => {
                    console.log(`error caught : ${JSON.stringify(err)}`);
                    setError("Unable to retrieve blog post")
                });
        }
        catch (error) {
            console.log(`unexpected error : ${error}`);
            setError("Unable to retrieve blog post");
        }
        finally {
            setLoading(false);
        }
    }

    const createBlogPost = () => {
        if (title === "" || type === 0 || content == "" || image == "") {
            setError("Please fill out all required fields");
            setSuccess("");

            return null;
        }

        setError("");
        setSuccess("");
        setSaving(true);

        try {
            fetch(`${server.baseUrl}/blogs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    type: type,
                    image: image,
                    content: content,
                    isDraft: false
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        setId(data.id);
                        setSuccess("Blog posted. You can continue to edit on this page");

                        window.location.href = `/blog/edit/${data.id}`;
                    }
                    else {
                        console.log(`error : ${JSON.stringify(data)}`);
                        setError("Unable to create blog post");
                    }
                })
                .catch(err => {
                    console.log(`error caught : ${JSON.stringify(err)}`);
                    setError("Unable to create blog post")
                });
        }
        catch (error) {
            console.log(`unexpected error : ${error}`);
            setError("Unable to create blog post");
        }
        finally {
            setSaving(false);
        }
    }

    const createDraftBlogPost = () => {
        if (title === "" || type === 0 || content == "" || image == "") {
            setError("Please fill out all required fields");
            setSuccess("");

            return null;
        }

        setError("");
        setSuccess("");
        setSaving(true);

        try {
            fetch(`${server.baseUrl}/blogs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    type: type,
                    image: image,
                    content: content,
                    isDraft: true
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        setId(data.id);
                        setIsDraft(true);
                        setSuccess("Blog post has been saved as a draft. You can continue to edit on this page");

                        window.location.href = `/blog/edit/${data.id}`;
                    }
                    else {
                        console.log(`error : ${JSON.stringify(data)}`);
                        setError("Unable to save blog post as draft");
                    }
                })
                .catch(err => {
                    console.log(`error caught : ${JSON.stringify(err)}`);
                    setError("Unable to save blog post as draft")
                });
        }
        catch (error) {
            console.log(`unexpected error : ${error}`);
            setError("Unable to save blog post as draft");
        }
        finally {
            setSaving(false);
        }
    }

    const publishBlogPost = () => {
        if (title === "" || type === 0 || content == "" || image == "") {
            setError("Please fill out all required fields");
            setSuccess("");

            return null;
        }

        setError("");
        setSuccess("");
        setSaving(true);

        try {
            fetch(`${server.baseUrl}/blogs/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    type: type,
                    image: image,
                    content: content,
                    isDraft: false
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        setId(data.blog.id);
                        setIsDraft(false);
                        setCreatedDate(data.blog.createdDate);
                        setSuccess("Blog post has been published. You can continue to edit on this page");
                    }
                    else {
                        console.log(`error : ${JSON.stringify(data)}`);
                        setError("Unable to publish blog post");
                    }
                })
                .catch(err => {
                    console.log(`error caught : ${JSON.stringify(err)}`);
                    setError("Unable to publish blog post")
                });
        }
        catch (error) {
            console.log(`unexpected error : ${error}`);
            setError("Unable to publish blog post");
        }
        finally {
            setSaving(false);
        }
    }

    const archiveBlogPost = () => {
        if (title === "" || type === 0 || content == "" || image == "") {
            setError("Please fill out all required fields");
            setSuccess("");

            return null;
        }

        setError("");
        setSuccess("");
        setSaving(true);

        try {
            fetch(`${server.baseUrl}/blogs/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    type: type,
                    image: image,
                    content: content,
                    isDraft: true
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        setId(data.blog.id);
                        setIsDraft(true);
                        setCreatedDate("");
                        setSuccess("Blog post has been archived. You can continue to edit on this page");
                    }
                    else {
                        console.log(`error : ${JSON.stringify(data)}`);
                        setError("Unable to archive blog post");
                    }
                })
                .catch(err => {
                    console.log(`error caught : ${JSON.stringify(err)}`);
                    setError("Unable to archive blog post")
                });
        }
        catch (error) {
            console.log(`unexpected error : ${error}`);
            setError("Unable to archive blog post");
        }
        finally {
            setSaving(false);
        }
    }

    const updateBlogPost = () => {
        if (title === "" || type === 0 || content === "" || image == "") {
            setError("Please fill out all required fields");
            setSuccess("");

            return null;
        }

        setError("");
        setSuccess("");
        setSaving(true);

        try {
            fetch(`${server.baseUrl}/blogs/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    type: type,
                    image: image,
                    content: content
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        setSuccess("Blog post updated");
                    }
                    else {
                        console.log(`error : ${JSON.stringify(data)}`);
                        setError("Unable to update blog post");
                    }
                })
                .catch(err => {
                    console.log(`error caught : ${JSON.stringify(err)}`);
                    setError("Unable to update blog post")
                });
        }
        catch (error) {
            console.log(`unexpected error : ${error}`);
            setError("Unable to update blog post");
        }
        finally {
            setSaving(false);
        }
    }

    const deleteBlogPost = () => {
        setError("");
        setSuccess("");
        setSaving(true);

        try {
            fetch(`${server.baseUrl}/blogs/${id}`, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        setId("");
                        setTitle("");
                        setType(0);
                        setImage("");
                        setImagePreview("");
                        setContent("");
                        setSuccess("Blog post deleted");

                        window.location.href = `/blog/edit`;
                    }
                    else {
                        console.log(`error : ${JSON.stringify(data)}`);
                        setError("Unable to delete blog post");
                    }
                })
                .catch(err => {
                    console.log(`error caught : ${JSON.stringify(err)}`);
                    setError("Unable to delete blog post")
                });
        }
        catch (error) {
            console.log(`unexpected error : ${error}`);
            setError("Unable to delete blog post");
        }
        finally {
            setSaving(false);
        }
    }

    const verifyFile = files => {
        console.log("verifyFile");

        if (files && files.length > 0) {
            const currentFile = files[0];
            const currentFileType = currentFile.type;
            const currentFileSize = currentFile.size;
            if (currentFileSize > imageMaxSize) {
                alert(`This file is not allowed. ${currentFileSize} bytes is too large.`);
                return false;
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed.");
                return false;
            }

            return true;
        }
    };

    const handleOnDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            verifyFile(rejectedFiles);
        }

        if (files && files.length > 0) {
            const isVerified = verifyFile(files);
            if (isVerified) {
                const currentFile = files[0];
                const fileItemReader = new FileReader();
                fileItemReader.addEventListener("load", () => {
                    const result = fileItemReader.result;
                    setImagePreview(result);
                }, false);

                fileItemReader.readAsDataURL(currentFile);

                setCrop({
                    unit: 'px',
                    x: 0,
                    y: 0,
                    width: 90,
                    height: 60
                });
            }
        }
    }

    const handleOnCropChange = crop => {
        setCrop(crop);
    };

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);

                const canvasRef = previewCanvasRef.current;
                const image64 = canvasRef.toDataURL("image/");

                console.log(`base64 : ${image64}`);
                setImage(image64);
            }
        }, 100, [completedCrop]
    );

    if (loading)
        return <LoadingComponent />;

    return (
        <Container style={{ marginBottom: "5vh" }}>
            <Fade cascade>
                <Form>
                    {id != null && id != '' &&
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                className="mb-2"

                                color="success"
                                tag={Link}
                                to={`/blog/post/${id}`}
                                target="_blank"
                            >
                                View your blog post
                            </Button>
                        </div>
                    }
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={title}
                            id="title"
                            placeholder="Enter a title ..."
                            disabled={saving}
                            onChange={event => setTitle(event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="type">Type</Label>
                        <Row><Input
                            className="col-4 form-control ml-3"
                            type="select"
                            name="type"
                            value={type}
                            id="type"
                            disabled={saving}
                            onChange={event => setType(event.target.value)}
                        >
                            <option value="0">Pick an option...</option>
                            <option value="1">Travel</option>
                            <option value="2">Recipies</option>
                            <option value="3">Van Life</option>
                        </Input></Row>
                    </FormGroup>

                    <FormGroup>
                        <Label for="image">Preview Image</Label>

                        <div className="container mb-5">
                            <div {...getRootProps({ style })}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop your preview image here, or click to select an image</p>
                            </div>
                        </div>

                        {imagePreview !== null && imagePreview !== "" &&
                            <div>
                                <ReactCrop
                                    crop={crop}
                                    aspect={3 / 2}
                                    maxWidth={900}
                                    maxHeight={600}
                                    keepSelection={true}
                                    onComplete={c => setCompletedCrop(c)}
                                    onChange={handleOnCropChange}
                                >
                                    <img ref={imgRef} src={imagePreview} />
                                </ReactCrop>
                            </div>
                        }
                        <div>
                            {!!completedCrop &&
                                <canvas
                                    ref={previewCanvasRef}
                                    style={{
                                        display: "none",
                                        border: "1px solid black",
                                        objectFit: "contain",
                                        width: completedCrop.width,
                                        height: completedCrop.height
                                    }}
                                />
                            }
                        </div>

                    </FormGroup>

                    <FormGroup>
                        <Label>Content</Label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            modules={modules}
                            onChange={newValue => {
                                setContent(newValue);
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        {id != null && id != '' ?
                            <div>
                                {isDraft === true &&
                                    <Button
                                        className="mb-2"
                                        block
                                        color="info"
                                        onClick={() => publishBlogPost()}
                                        disabled={saving}
                                    >
                                        <i className="fas fa-newspaper mr-1"></i>
                                        Publish
                                    </Button>
                                }
                                <Button
                                    className="mb-2"
                                    block
                                    color="primary"
                                    onClick={() => updateBlogPost()}
                                    disabled={saving}
                                >
                                    <i className="fas fa-pen mr-1"></i>
                                    Update
                                </Button>
                            </div>
                            :
                            <div>
                                <Button
                                    className="mb-2"
                                    block
                                    onClick={() => createDraftBlogPost()}
                                    disabled={saving}
                                >
                                    <i className="fas fa-copy mr-1"></i>
                                    Save as Draft
                                </Button>
                                <Button
                                    className="mb-2"
                                    block
                                    color="primary"
                                    onClick={() => createBlogPost()}
                                    disabled={saving}
                                >
                                    <i className="fas fa-newspaper mr-1"></i>
                                    Post
                                </Button>
                            </div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <SuccessText success={success} />
                        <ErrorText error={error} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Preview</Label>
                        <BlogPost title={title} createdDate={createdDate} content={content} />
                    </FormGroup>
                    {id != null && id != '' &&
                        <div>
                            {isDraft === false &&
                                <Button
                                    className="mb-2"
                                    block
                                    color="primary"
                                    onClick={() => archiveBlogPost()}
                                    disabled={saving}
                                >
                                    <i className="fas fa-box-archive mr-1"></i>
                                    Archive
                                </Button>
                            }

                            <Button
                                className="mb-2"
                                block
                                color="danger"
                                onClick={() => deleteBlogPost()}
                                disabled={saving}
                            >
                                <i className="fas fa-trash mr-1"></i>
                                Delete
                            </Button>
                        </div>
                    }
                </Form>
            </Fade>
        </Container>
    );
}