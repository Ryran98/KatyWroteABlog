import React from 'react';
import { Container } from 'reactstrap';
import { Footer } from '../../components/footer';

export class VanLifeBlogPage extends React.Component {
    render() {
        return (
            <div>
                <Container className="mt-5">
                    Van Life
                </Container>
                <Footer />
            </div>
        );
    }
}