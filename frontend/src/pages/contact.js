import React from 'react';
import { Container } from 'reactstrap';
import { Footer } from '../components/footer';

export class ContactPage extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <h2>Lets chat…</h2>
                    <p>Got a question, want to chat or interested in working
                        together get in touch with me at katywroteablog@gmail.com
                        or use the contact form below.
                    </p>
                </Container>
                <Footer />
            </div>
        );
    }
}