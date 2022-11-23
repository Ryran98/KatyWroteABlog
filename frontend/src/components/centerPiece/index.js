import React from "react";
import { Container } from "reactstrap";

export class CenterPiece extends React.Component {
    constructor(props) {
        super(props);

        this.children = props.children;
    }

    render() {
        return (
            <Container fluid className="p-0">
                <Container
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        WebkitTransform: 'translate(-50%, -50%)'
                    }}
                    className="d-flex justify-content-center"
                >
                    {this.children}
                </Container>
            </Container>
        );
    }
}