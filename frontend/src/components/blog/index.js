import React from "react";
import { Container, Row } from "reactstrap";

var containerStyle = {

};

var contentStyle = {
    fontSize: "17px"
};

export class Blog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            image: props.image,
            content: props.content
        };
    }

    render() {
        return (
            <Container fluid style={containerStyle}>
                <h2 className="col-12">{this.state.title}</h2>
                <img className="col-6" src={this.state.image} />
                <p className="col-6" style={contentStyle}>{this.state.content}</p>
            </Container>
        );
    }
}