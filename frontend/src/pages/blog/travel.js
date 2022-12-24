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
        setTimeout(() => {
            try {
                fetch(`${server.baseUrl}/blogs?blogTypeId=1`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success === true) {
                            const blogPosts = data.blogPosts;
                            setBlogPosts(blogPosts);
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
        }, 2000);
    }

    if (loading)
        return <LoadingComponent />;

    if (blogPosts === null)
        return (
            <Container>
                <h1>Travel blog coming soon...</h1>
            </Container>
        )

    return (
        <Container>
            <ErrorText error={error} />
                    {blogPosts.map(blogPost => {
                        return (
                            <Fade>
                                <BlogPostPreview title={blogPost.title} content={blogPost.content} createdDate={blogPost.createdDate} />
                            </Fade>
                        );
                    })}
        </Container>
    );
}