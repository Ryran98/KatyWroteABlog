import React from "react";
import { Container } from "reactstrap";
import server from "../../config/config";
import axios from 'axios';
import { LoadingComponent } from "../../components/loadingComponent/loadingComponent";
import { ErrorText } from "../../components/errorText";

export class BlogPostPage extends React.Component {
    constructor(props) {
        super(props);

        this.blogPostId = props.match.params.blogPostId;
        this.state = {
            error: "",
            loading: true
        };
    }

    componentDidMount() {
        if (this.blogPostId != null)
            this.getBlogPost();
        else
            this.setState({ loading: false });
    }

    async getBlogPost() {
        try {
            const response = await axios({
                method: "GET",
                url: `${server.baseUrl}/blogs?blogPostId=${this.blogPostId}`
            });

            console.log(`response : ${JSON.stringify(response)}`);

            if (response.status === (200 || 304)) {
                var blogPost = response.data.blogPost;
                console.log(`blog post : ${blogPost}`);

                this.title = blogPost.title;
                this.type = blogPost.type;
                this.image = blogPost.image;
                this.content = blogPost.content;
            }
            else {
                console.log(`An error has occurred while trying to get blog post id ${this.state.blogPostId}`);
                this.setState({ error: "Unable to retrieve blog post" });
            }
        }
        catch (error) {
            this.setState({ error: "Unable to retrieve blog post" });
            console.log(`An error has occurred : ${error.message}`);
        }
        finally {
            this.setState({ loading: false });
        }
    }

    render() {
        if (this.state.loading)
            return <LoadingComponent />;

        return (
            <Container>
                <ErrorText error={this.state.error} />
                <h1>{this.title}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: this.content
                    }}
                />
            </Container>
        );
    }
}