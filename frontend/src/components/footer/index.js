import React from "react";
import { Container, Row } from "reactstrap";
import { Brands } from "./brands";
import { SubscribeForm } from "./subscribeForm";

var footerStyle = {
    marginTop: "5vh"
};

var lineBreakStyle = {
    marginBottom: "5vh"
};

var footerBarStyle = {
    backgroundColor: "#068845",
    color: "#ffffff",
    minHeight: "40px",
};

export function Footer(props) {
    return (
        <div style={footerStyle}>
            <hr style={lineBreakStyle} />
            <Brands />
            <Container fluid style={footerBarStyle}>
                <Row className="justify-content-center">
                    ©2022 KatyWroteABlog
                </Row>
            </Container>
        </div>
    );
}