import React from "react";
import { Container, Row } from "reactstrap";
import { Brands } from "./brands";

const lineBreakStyle = {
    marginBottom: "2.5vh"
  };
  
  const footerBarStyle = {
    backgroundColor: "#068845",
    color: "#ffffff",
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

export function Footer(props) {
    return (
        <div>
            <hr style={lineBreakStyle} />
            <Brands />
            <Container fluid style={footerBarStyle}>
                <Row>
                    ©2022 KatyWroteABlog
                </Row>
            </Container>
        </div>
    );
}