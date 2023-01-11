import React from 'react';
import { Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Footer } from '../components/footer';

export class ContactPage extends React.Component {
    render() {
        return (
            <Container>
                <Container className="col-6">
                    <h2 style={{ display: "flex", justifyContent: "center" }}>Lets chat…</h2>
                    <p style={{ display: "flex", textAlign: "center" }}>Got a question, want to chat or interested in working
                        together get in touch with me at katywroteablog@gmail.com
                        or use the contact form below.
                    </p>
                </Container>
                <Container className="col-8">
                    <Form>
                        <FormGroup floating>
                            <Input
                                id="exampleEmail"
                                name="email"
                                placeholder="Email"
                                type="email"
                            />
                            <Label for="exampleEmail">
                                Email
                            </Label>
                        </FormGroup>
                    </Form>
                </Container>
            </Container>
        );
    }
}