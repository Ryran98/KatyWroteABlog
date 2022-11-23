import React, { useEffect, useState } from "react";
import server from "../../config/config";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import axios from 'axios';
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SuccessText } from "../../components/successText";
import { ErrorText } from "../../components/errorText";
import { LoadingComponent } from "../../components/loadingComponent/loadingComponent";
import { Footer } from "../../components/footer";

export function EditBlogPostPage(props) {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState(0);
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");

    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        let blogId = props.match.params.blogPostId;

        if (blogId) {
            setId(blogId);
            getBlogPost(blogId);
        }
        else
            setLoading(false);
    }, []);

    const modules = {
        toolbar: [
            [{ font: [] }],
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

    const getBlogPost = async (id) => {
        try {
            const response = await axios({
                method: "GET",
                url: `${server.baseUrl}/blogs?blogPostId=${id}`
            });

            if (response.status === (200 || 304)) {
                var blogPost = response.data.blogPost;

                setTitle(blogPost.title);
                setType(blogPost.type);
                setImage(blogPost.image);
                setContent(blogPost.content);
            }
            else {
                console.log(`An error has occurred while trying to get blog post id ${id}`);
                setError(`Unable to retrieve blog post id ${id}`);
            }
        }
        catch (error) {
            console.log(`An error has occurred : ${error}`);
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const createBlogPost = async () => {
        if (title === "" || type === 0 || content == "") {
            setError("Please fill out all required fields");
            setSuccess("");
        }

        setError("");
        setSuccess("");
        setSaving(true);

        try {

            const response = await axios({
                method: "POST",
                url: `${server.baseUrl}/blogs`,
                data: {
                    title: title,
                    type: type,
                    image: image,
                    content: content
                }
            });

            if (response.status === 201) {
                setId(response.id);
                setSuccess("Blog posted. You can continue to edit on this page");
            }
            else {
                console.log(`An error has occurred while trying to create a blog post : ${response}`);
                setError("Unable to create blog post");
            }
        }
        catch (error) {
            console.log(`error : ${error}`);
            setError(error.message);
        }
        finally {
            setSaving(false);
        }
    }

    const editBlogPost = async () => {
        if (title === "" || type === 0 || content == "") {
            setError("Please fill out all required fields");
            setSuccess("");
        }

        setError("");
        setSuccess("");
        setSaving(true);

        try {
            const response = await axios({
                method: "PATCH",
                url: `${server.baseUrl}/blogs/${id}`,
                data: {
                    title: title,
                    type: type,
                    image: image,
                    content: content
                }
            });

            if (response.status === 201) {
                setSuccess("Blog post updated");
            }
            else {
                console.log(`An error has occurred while trying to update blog post id ${id} : ${response}`);
                setError("Unable to update blog post");
            }
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setSaving(false);
        }
    }

    const deleteBlogPost = async () => {
        try {
            const response = await axios({
                method: "DELETE",
                url: `${server.baseUrl}/blogs/${id}`
            });

            if (response.status === 200) {
                setSuccess("Blog post deleted");
                setId("");
            }
            else {
                console.log(`An error has occurred while trying to delete blog post id ${id} : ${response}`);
                setError("Unable to delete blog post");
            }
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setSaving(false);
        }
    }

    if (loading)
        return <LoadingComponent />;

    return (
        <div>
            <Container>
                <Form>
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
                        <Input
                            className="col-12"
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
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Image URL</Label>
                        <Input
                            type="file"
                            name="image"
                            value={""}
                            id="image"
                            disabled={saving}
                            onChange={event => setImage(event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Content</Label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            modules={modules}
                            onChange={newValue => {
                                console.log(`value : ${newValue}`);
                                setContent(newValue);
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <SuccessText success={success} />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            block
                            onClick={() => {
                                if (id != null && id != '')
                                    editBlogPost();
                                else
                                    createBlogPost();
                            }}
                            disabled={saving}
                        >
                            <i className="fas fa-save mr-1"></i>
                            {id != null && id != '' ? "Update" : "Post"}
                        </Button>
                        {id != null && id != '' &&
                            <Button
                                block
                                color="success"
                                tag={Link}
                                to={`/blogs/${id}`}
                            >
                                View your blog post!
                            </Button>}
                    </FormGroup>
                    <ErrorText error={error} />
                    <FormGroup>
                        <Label>Preview</Label>
                        <div className="border ql-container p-2">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content
                                }}
                            />
                        </div>
                    </FormGroup>
                </Form>
            </Container>
            <Footer />
        </div>
    );
}