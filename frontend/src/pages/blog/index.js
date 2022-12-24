import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import server from "../../config/config";
import { LoadingComponent } from "../../components/loadingComponent/loadingComponent";
import { ErrorText } from "../../components/errorText";
import { Footer } from "../../components/footer";
import { BlogPost } from "../../components/blogPost";

export function BlogPostPage(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const blogPostId = props.match.params.id;

        if (blogPostId)
            getBlogPost(blogPostId);
        else
            setLoading(false);
    }, []);


    const getBlogPost = (id) => {
        try {
            fetch(`${server.baseUrl}/blogs?id=${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        const blogPost = data.blogPost;

                        setTitle(blogPost.title);
                        setContent(blogPost.content);
                    }
                    else {
                        console.log(`error : ${JSON.stringify(data)}`);
                        setError(data.message);
                    }
                })
                .catch(err => {
                    console.log(`error caught : ${JSON.stringify(err)}`);
                    setError(err)
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

    if (loading)
        <LoadingComponent />

    return (
        <Container>
            <ErrorText error={error} />
            <BlogPost title={title} content={content} />
        </Container>
    );
}