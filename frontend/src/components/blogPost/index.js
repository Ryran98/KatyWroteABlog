import React from "react";
import ReactQuill from "react-quill";
import { Container, Row } from "reactstrap";

export function BlogPost(props) {
    return (
        <Container>
            <Row className="justify-content-center">
                <h1>{props.title}</h1>
            </Row>
            <ReactQuill
                theme="bubble"
                value={props.content}
                readOnly={true}
            />
        </Container>
    );
}