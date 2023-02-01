import React from "react";
import { Container, Row } from "reactstrap";

var brandStyle = {
    paddingBottom: "3vh"
};

var facebookStyle = {
    fontSize: "15px",
    marginRight: "15px",
    color: "#000000"
};

var twitterStyle = {
    fontSize: "15px",
    color: "#000000"
};

var instagramStyle = {
    fontSize: "15px",
    marginLeft: "15px",
    color: "#000000"
};

export class Brands extends React.Component {
    render() {
        return (
            <Container fluid className="d-flex justify-content-center" style={{marginBottom: "2.5vh"}}>
                <a href="https://www.facebook.com/katy.drayton.5/" target="_blank"><i className="fa-brands fa-facebook-f" style={facebookStyle}></i></a>
                <a href="https://www.twitter.com/" target="_blank"><i className="fa-brands fa-twitter" style={twitterStyle}></i></a>
                <a href="https://www.instagram.com/katys_squares/" target="_blank"><i className="fa-brands fa-square-instagram" style={instagramStyle}></i></a>
            </Container>
        );
    }
}