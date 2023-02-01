import React, { useState } from 'react';
import server from '../config/config';
import { Button, Container, Form, Input } from 'reactstrap';
import Fade from "react-reveal/Fade";
import { SuccessText } from '../components/successText';
import { ErrorText } from '../components/errorText';

export function ContactPage(props) {
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    
    const submitContactForm = () => {
        if (firstName === "" || surname === "" || email === "" || subject === "" || message === "") {
            setError("Please fill out all required fields");
            setSuccess("");

            return null;
        }

        setError("");
        setSuccess("");

        try {
            fetch(`${server.baseUrl}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: firstName,
                    surname: surname,
                    email: email,
                    phoneNumber: phoneNumber,
                    subject: subject,
                    message: message
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        setSuccess("Your message has been sent");
                    }
                    else {
                        console.log(`error : ${JSON.stringify(data)}`);
                        setError("Message send has failed");
                    }
                })
                .catch(err => {
                    console.log(`error caught : ${JSON.stringify(err)}`);
                    setError("Message send has failed")
                });
        }
        catch (error) {
            console.log(`unexpected error : ${error}`);
            setError("Message send has failed");
        }
    }

    return (
        <Container>
            <Fade cascade>
                <Container className="col-12 col-md-8 col-xl-6">
                    <h2 style={{ display: "flex", justifyContent: "center" }}>Lets chat…</h2>
                    <p style={{ display: "flex", textAlign: "center" }}>Got a question, want to chat or interested in working
                        together get in touch with me at katywroteablog@gmail.com
                        or use the contact form below.
                    </p>
                </Container>
                <Container className="col-12 col-md-8 col-xl-6">
                    <Form>
                        <Input
                            className="mb-2"
                            type="text"
                            value={firstName}
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            className="mb-2"
                            type="text"
                            value={surname}
                            placeholder="Surname"
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <Input
                            className="mb-2 col-md-6"
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            className="mb-2 col-md-6"
                            type="text"
                            value={phoneNumber}
                            placeholder="Phone Number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <Input
                            className="mb-2"
                            type="text"
                            value={subject}
                            placeholder="Subject"
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <Input
                            type="textarea"
                            value={message}
                            placeholder="Message"
                            rows="4"
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="d-flex justify-content-center">
                            <Button size="lg" className="mt-3" onClick={submitContactForm} disabled={success}>Submit</Button>
                        </div>
                    </Form>
                </Container>
                <SuccessText success={success} />
                <ErrorText error={error} />
            </Fade>
        </Container>
    );
}