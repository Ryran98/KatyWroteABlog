import React from 'react';
import { Container } from 'reactstrap';
import { Footer } from '../components/footer';

export class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Container className="mt-5" >
                    Home Page
                </Container>
                <Footer hasSubscribeForm="1" />
            </div>
        );
    }
}