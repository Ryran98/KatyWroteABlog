import React, { useEffect, useState, useMemo, useRef } from "react";
import server from "../../config/config";
import { canvasPreview } from "../../helpers/canvasPreview";
import { useDebounceEffect } from "../../helpers/useDebounceEffect";

import { Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// import "./custom-image-crop.css";

import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SuccessText } from "../../components/successText";
import { ErrorText } from "../../components/errorText";
import { LoadingComponent } from "../../components/loadingComponent/loadingComponent";
import { BlogPost } from "../../components/blogPost";

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
        unit: 'px',
        x: 0,
        y:0,
        width: 90,
        height: 60
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

    const {getRootProps, getInputProps, isFocused, isDragAccept, isDragReject} = useDropzone(
        {
            accept: {"image/*": []},
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
    const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()});

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
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"]
        ]
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
        if (title === "" || type === 0 || content == "") {
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
        if (title === "" || type === 0 || content == "") {
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
        if (title === "" || type === 0 || content == "") {
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

    const editBlogPost = () => {
        if (title === "" || type === 0 || content === "") {
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
            }
        }, 100, [completedCrop]
    );

    // const handleOnCropComplete = (pixelCrop, percentageCrop) => {
        
        
    //     // console.log(`percentageCrop: ${JSON.stringify(percentageCrop)}`);
    //     // saveCroppedImage(pixelCrop);
    // };

    const saveCroppedImage = (pixelCrop) => {

        console.log(`pixelCrop: ${JSON.stringify(pixelCrop)}`);
        const canvas = React.createRef().current;

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = imagePreview;
        image.onLoad = function () {
            ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
        }

        console.log(`image : ${JSON.stringify(image)}`);
    }

    if (loading)
        return <LoadingComponent />;

    return (
        <div>
            <Container>
                <Form>
                    {id != null && id != '' &&
                        <Button
                            className="mb-2"
                            block
                            color="success"
                            tag={Link}
                            to={`/blog/post/${id}`}
                            target="_blank"
                        >
                            View your blog post
                        </Button>
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

                    {/* Standard image input */}
                    {/* <FormGroup>
                        <Label for="image">Preview Image</Label>
                        <Input
                            type="file"
                            name="image"
                            id="image"
                            disabled={saving}
                            onChange={e => {
                                uploadImage(e);
                            }}
                        />
                        <img src={imagePreview} style={previewImageStyle} />
                    </FormGroup> */}

                    {/* Dropzone attempt #1 */}
                    {/* <FormGroup>
                        <Label for="image">Preview Image</Label>
                        <Dropzone onDrop={acceptedFiles => console.log(`acceptedFiles : ${acceptedFiles}`)}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </FormGroup> */}

                    <FormGroup>
                        <Label for="image">Preview Image</Label>

                        {/* <input ref={fileInputRef} type="file" accept={acceptedFileTypes} multiple={false} onChange={handleFileSelect} /> */}
                        
                        <div className="container">
                                <div {...getRootProps({style})}>
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
                                    onClick={() => editBlogPost()}
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
                        <BlogPost title={title} content={content} />
                    </FormGroup>
                    {id != null && id != '' &&
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
                    }
                </Form>
            </Container>
        </div>
    );
}