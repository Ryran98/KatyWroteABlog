import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import headerImage from "../../images/HeaderImage.jpg";

export class Header extends React.Component {
    constructor(props) {
        super(props);

        this.title = props.title;
        this.headline = props.headline;
        this.children = props.children;
        this.height = props.height ?? '100%';
        this.imageUrl = props.image ?? 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';

        this.headerStyle = {
            background: 'url(' + headerImage + ') no-repeat fixed',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height: this.height,
            marginBottom: "5vh"
        };
    }
    
    render() {
        return (
            <header className="masthead" style={this.headerStyle}>
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row align-items-center text-center">
                        <Col>
                            <h1 className="display-4 text-white mt-5 mb-2">{this.title}</h1>
                            <h3 className="mb-5 text-white">{this.headline}</h3>
                            {this.children}
                        </Col>
                    </div>
                </div>
            </header>
        );
    }
}