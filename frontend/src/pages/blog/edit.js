import React from "react";
import server from "../../config/config";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import axios from 'axios';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export class EditBlogPage extends React.Component {
    constructor(props) {
        super(props);

        // this.getBlogPost = this.getBlogPost.bind(this);
        // this.createBlogPost = this.createBlogPost.bind(this);
        // this.editBlogPost = this.editBlogPost.bind(this);
        // this.deleteBlogPost = this.deleteBlogPost.bind(this);

        this.blogPostId = props.match.params.blogPostId;
        this.title = "";
        this.type = 0;
        this.image = "";
        this.content = "";

        this.state = {
            editorState: EditorState.createEmpty(),
            saving: false,
            loading: true,
            success: "",
            error: ""
        };

        this.getTitle = this.getTitle.bind(this);
        this.setTitle = this.setTitle.bind(this);
    }

    componentDidMount() {
        if (this.state.blogPostId != null)
            this.getBlogPost();
        else
            this.setState({ loading: false });
    }

    getTitle() {
        console.log(`title : ${this.title}`);
        return this.title;
    }

    setTitle(value) {
        this.title = value;
    }

    async getBlogPost() {
        try {
            const response = await axios({
                method: "GET",
                url: `${server.baseUrl}/blogs?blogPostId=${this.state.blogPostId}`
            });

            if (response.status === (200 || 304)) {
                var blogPost = response.data.blogPost;

                    this.title = blogPost.title;
                    this.type = blogPost.type;
                    this.image = blogPost.image;
                    this.content = blogPost.content;

                const contentBlock = htmlToDraft(blogPost.content);
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);

                this.setState({ editorState: editorState });
            }
            else {
                console.log(`An error has occurred while trying to get blog post id ${this.state.blogPostId}`);
                this.setState({ error: "Unable to retrieve blog post" });
            }
        }
        catch (error) {
            this.setState({ error: error.message });
            console.log(`An error has occurred : ${error}`);
        }
        finally {
            this.setState({ loading: false });
        }
    }

    async createBlogPost() {
        if (this.state.title === "" || this.state.type === 0 || this.state.content == "") {
            this.setState({
                error: "Please fill out all required fields",
                success: ""
            });
            return null;
        }

        this.setState({
            error: "",
            success: "",
            saving: true
        });

        try {
            const response = await axios({
                method: "POST",
                url: `${server.baseUrl}/blogs`,
                data: {
                    title: this.state.title,
                    type: this.state.type,
                    image: this.state.image,
                    contenet: this.state.content
                }
            });

            if (response.status === 201) {
                this.setState({
                    blogPostId: response.id,
                    success: "Blog posted. You can continue to edit on this page"
                });
            }
            else {
                this.setState({ error: "Unable to create blog post" });
                console.log(`An error has occurred while trying to create a blog post : ${response}`);
            }
        }
        catch (error) {
            this.setState({ error: error.message });
        }
        finally {
            this.setState({ saving: false });
        }
    }

    async editBlogPost() {
        if (this.state.title === "" || this.state.type === 0 || this.state.content == "") {
            this.setState({
                error: "Please fill out all required fields",
                success: ""
            });
            return null;
        }

        this.setState({
            error: "",
            success: "",
            saving: true
        });

        try {
            const response = await axios({
                method: "PATCH",
                url: `${server.baseUrl}/blogs/${this.state.blogPostId}`,
                data: {
                    title: this.state.title,
                    type: this.state.type,
                    image: this.state.image,
                    content: this.state.content
                }
            });

            if (response.status === 201) {
                this.setState({ success: "Blog post updated" });
            }
            else {
                this.setState({ error: "Unabled to updated blog post" });
                console.log(`An error has occurred while trying to update blog post id ${this.state.blogPostId} : ${response}`);
            }
        }
        catch (error) {
            this.setState({ error: error.message });
        }
        finally {
            this.setState({ saving: false });
        }
    }

    async deleteBlogPost() {
        try {
            const response = await axios({
                method: "DELETE",
                url: `${server.baseUrl}/blogs/${this.state.blogPostId}`
            });

            if (response.status === 200) {
                this.setState({
                    success: "Blog post deleted",
                    blogPostId: ""
                });
            }
            else {
                this.setState({ error: "Unable to delete blog post" });
                console.log(`An error has occurred while trying to delete blog post id ${this.state.blogPostId} : ${response}`);
            }
        }
        catch (error) {
            this.setState({ error: error.message });
        }
        finally {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <Container>
                <Form>
                    <FormGroup>
                        <Label for="title">Title *</Label>
                        <Input
                            type="text"
                            name="title"
                            value={this.getTitle()}
                            id="title"
                            placeholder="Enter a title ..."
                            disabled={this.state.saving}
                            onChange={event => this.setTitle(event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="type">Type *</Label>
                        <Input
                            className="col-12"
                            type="select"
                            name="type"
                            value={this.state.type}
                            id="type"
                            disabled={this.state.saving}
                            onChange={event => this.setState({type: event.target.value})}
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
                            type="text"
                            name="image"
                            value={this.state.image ?? ""}
                            id="image"
                            placeholder="Picture URL, ex: http://...."
                            disabled={this.state.saving}
                            onChange={event => this.setState({ image: event.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Content</Label>
                        <Editor
                            editorState={this.state.editorState}
                            wrapperClassName="card"
                            editorClassName="card-body"
                            onEditorStateChange={newState => {

                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        {/* <SuccessText success={success} /> */}
                    </FormGroup>
                    <FormGroup>
                        <Button
                            block
                            onClick={() => {
                                if (this.state.blogPostId != null && this.state.blogPostId != '')
                                    this.editBlogPost();
                                else
                                    this.createBlogPost();
                            }}
                            disabled={this.state.isSaving}
                        >
                            <i className="fas fa-save mr-1"></i>
                            {this.state.blogPostId != null && this.state.blogPostId != '' ? "Update" : "Post"}
                        </Button>
                        {this.state.blogPostId !== null && this.state.blogPostId !== '' &&
                            <Button
                                block
                                color="success"
                                tag={Link}
                                to={`/blogs/${this.state.blogPostId}`}
                            >
                                View your blog post!
                            </Button>}
                    </FormGroup>
                    <FormGroup>
                        <Label>Preview</Label>

                    </FormGroup>
                </Form>
            </Container>
        );
    }
}