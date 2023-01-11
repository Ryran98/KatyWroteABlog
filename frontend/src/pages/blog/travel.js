import React, { useEffect, useState } from 'react';
import server from "../../config/config";
import { Container } from 'reactstrap';
import Fade from "react-reveal/Fade";
import { BlogPostPreview } from '../../components/blogPost/preview';
import { ErrorText } from '../../components/errorText';
import { LoadingComponent } from '../../components/loadingComponent/loadingComponent';

export function TravelBlogPage(props) {
    const [blogPosts, setBlogPosts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getBlogPosts();
    }, []);

    const getBlogPosts = () => {
        try {
            fetch(`${server.baseUrl}/blogs?blogTypeId=1`)
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        const blogPosts = data.blogPosts;
                        setBlogPosts(blogPosts);
                        setLoading(false);
                    }
                    else {
                        console.log(`error : ${JSON.stringify(data)}`);
                        setError("Unable to retrieve blog posts");
                        setLoading(false);
                    }
                })
                .catch(err => {
                    console.log(`error caught : ${JSON.stringify(err)}`);
                    setError("Unable to retrieve blog posts");
                    setLoading(false);
                });
        }
        catch (error) {
            console.log(`unexpected error : ${error}`);
            setError("Unable to retrieve blog posts");
            setLoading(false);
        }
    }

    if (loading)
        return <LoadingComponent />;

    if (blogPosts === null || blogPosts.length < 1)
        return (
            <Fade>
                <Container style={{ display: "flex", justifyContent: "center" }}>
                    <h1>Travel blog coming soon...</h1>
                </Container>
            </Fade>
        );

    return (
        <Container style={{marginBottom: "5vh"}}>
            <ErrorText error={error} />
            {blogPosts.map(blogPost => {
                return (
                    <Fade>
                        <BlogPostPreview
                            id={blogPost.id}
                            title={blogPost.title}
                            image={blogPost.image}
                            content={blogPost.content}
                            isDraft={blogPost.isDraft}
                            createdDate={blogPost.createdDate}
                        />
                    </Fade>
                );
            })}
        </Container>
    );
}