import React from 'react';
import { Container } from 'reactstrap';
import { Footer } from '../../components/footer';

export class RecipiesBlogPage extends React.Component {
    render() {
        return (
            <div>
                <Container className="mt-5">
                    Recipies
                </Container>
                <Footer />
            </div>
        );
    }
}