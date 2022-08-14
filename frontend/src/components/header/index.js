import React from 'react';
import { Container, Row } from 'reactstrap';
import headerImage from "../../images/HeaderImage.jpg";

export class Header extends React.Component {
    constructor(props) {
        super(props);

        this.title = props.title;

        this.headerStyle = {
            background: 'url(' + headerImage + ') no-repeat fixed',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height: "30vh",
            marginBottom: "5vh",
            color: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        };
    }
    
    render() {
        return (
            <Container fluid style={this.headerStyle}>
                <Row>
                    <h1>{this.title}</h1>
                </Row>
            </Container>
        );
    }
}