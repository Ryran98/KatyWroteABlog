import React from "react";
import ReactQuill from "react-quill";
import { Container, Row } from "reactstrap";
import Fade from "react-reveal/Fade";

export function BlogPost(props) {
    return (
        <Container>
            <Fade>
                <Row className="justify-content-center">
                    <h1>{props.title}</h1>
                </Row>
                <Row className="justify-content-center">
                    <i style={{color: "grey"}}>{props.createdDate}</i>
                </Row>
            </Fade>
            <Fade>
                <ReactQuill
                    theme="bubble"
                    value={props.content}
                    readOnly={true}
                />
            </Fade>
        </Container>
    );
}