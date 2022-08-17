import React from "react";
import config from "../../config/config";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg";
import { Container, Input, Label } from "reactstrap";

export class EditBlogPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            type: 0,
            image: "",
            content: ""
        }

        this.blogPostId = props.blogPostId;
        if (this.blogPostId != null)
            this.getBlogPost(this.blogPostId);
    }

    getBlogPost(blogPostId) {
        $.ajax({
            url: `${config.server.baseUrl}/blogs/${blogPostId}`,
            type: "GET",
            success: (result) => {
                blogPost = result.blogs[0];
                this.setState({
                    title: blogPost.title,
                    type: blogPost.type,
                    image: blogPost.image,
                    content: blogPost.content
                });
            },
            error: (error) => {
                console.log(`An error has occurred while trying to get blog post id ${blogPostId} : ${error.message}`);
            }
        })
    }

    createBlogPost() {
        $.ajax({
            url: `${config.server.baseUrl}/blogs`,
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                title: this.state.title,
                type: this.state.type,
                image: this.state.image,
                content: this.state.content
            }),
            success: (result) => {
                console.log(`Blog post created successfully (${result.id})`);
            },
            error: (error) => {
                console.log(`An error has occurred while trying to create a new blog post : ${error.message}`);
            }
        })
    }

    editBlogPost(blogPostId) {
        $.ajax({
            url: `${config.server.baseUrl}/blogs/${blogPostId}`,
            type: "PATCH",
            contentType: 'application/json',
            data: JSON.stringify({
                title: this.state.title,
                type: this.state.type,
                image: this.state.image,
                content: this.state.content
            }),
            success: (result) => {
                console.log(`Blog post id ${blogPostId} has been updated successfully`);
            },
            error: (error) => {
                console.log(`An error has occurred while trying to update blog post id ${blogPostId} : ${error.message}`);
            }
        })
    }

    deleteBlogPost(blogPostId) {
        $.ajax({
            url: `${config.server.baseUrl}/blogs/${blogPostId}`,
            type: "DELETE",
            success: (result) => {
                console.log(`Blog post id ${result.id} deleted successfully`);
            },
            error: (error) => {
                console.log(`An error occurred while trying to delete blog post id ${blogPostId} : ${error.message}`);
            }
        })
    }
    
    render() {
        return (
            <Container fluid>
                <Form>
                    <FormGroup>
                        <Label for="title">Title *</Label>
                        <Input
                            type="text"
                            name="title"
                            value={this.state.title}
                            id="title"
                            placeholder="Enter a title ..."
                            disabled={this.state.saving}
                            onChange={event => this.setState({title: event.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Image URL</Label>
                        <Input
                            type="text"
                            name="image"
                            value={this.state.image}
                            id="image"
                            placeholder="Picture URL, ex: http://...."
                            disabled={this.state.saving}
                            onChange={event => this.setState({image: event.target.value})}
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
                </Form>
            </Container>
        );
    }
}