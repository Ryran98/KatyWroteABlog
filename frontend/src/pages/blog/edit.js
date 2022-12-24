import React, { useEffect, useState } from "react";
import server from "../../config/config";
import { Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SuccessText } from "../../components/successText";
import { ErrorText } from "../../components/errorText";
import { LoadingComponent } from "../../components/loadingComponent/loadingComponent";
import { BlogPost } from "../../components/blogPost";

const previewImageStyle = {
    maxHeight: "10vh"
};

export function EditBlogPostPage(props) {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [content, setContent] = useState("");
    const [isDraft, setIsDraft] = useState(false);
    const [createdDate, setCreatedDate] = useState("");

    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

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

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        setImagePreview(URL.createObjectURL(file));

        const base64 = await convertBase64(file);
        setImage(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

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
                        <Label for="title">Title *</Label>
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
                        <Label for="type">Type *</Label>
                        <Row><Input
                            className="col-4"
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
                    <FormGroup>
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