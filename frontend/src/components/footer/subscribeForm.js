import React from "react";
import { Button, Container, Form, Input } from 'reactstrap';

var footerStyle = {
    paddingBottom: "5vh"
};

var subscribeFormStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
};

var subscribeEmailInputStyle = {
    borderTop: "0",
    borderLeft: "0",
    borderRight: "0",
    marginBottom: "1rem"
};

export class SubscribeForm extends React.Component {
    render() {
        return (
            <Container fluid style={footerStyle}>
                <div style={subscribeFormStyle}>
                    <Form className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                        <Container fluid className="justify-content-center">
                            <h3>Subscribe to Katywroteablog</h3>
                            <p>To make sure you never miss a new recipe or any tips and tricks for tiny living 
                                and travelling pop you’re email below to subscribe. It’s a no meat zone so 
                                they’ll be no spam hitting your inbox just the odd friendly reminder so you 
                                don’t miss a beat. </p>
                            <Input type="email" placeholder="Email address" style={subscribeEmailInputStyle} />
                            <Button className="col-12" color="dark" type="submit">Submit</Button>
                        </Container>
                    </Form>
                </div>
            </Container>
        );
    }
}