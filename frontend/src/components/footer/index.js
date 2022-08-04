import React from "react";
import { Container, Row } from "reactstrap";
import { Brands } from "./brands";
import { SubscribeForm } from "./subscribeForm";

var footerStyle = {
    marginTop: "10vh"
};

var copyrightStyle = {
    backgroundColor: "#068845",
    color: "#ffffff",
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

export class Footer extends React.Component {
    render() {
        return (
            <div style={footerStyle}>
                <SubscribeForm />
                <Brands />
                <Container fluid style={copyrightStyle}>
                    <Row>
                        ©2022 KatyWroteABlog
                    </Row>
                </Container>
            </div>
        );
    }
}