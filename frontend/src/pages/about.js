import React from 'react';
import { Container, Row } from 'reactstrap';
import AboutImage from "../images/AboutMe.jpg";

var headingStyle = {
    marginBottom: "3vh"
};

var textStyle = {
    fontSize: "17px",
    lineHeight: "1.7",
    color: "#2f2e2f"
};

var aboutImageStyle = {
    maxHeight: "60vh"
};

export class AboutPage extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <div className="col-md-6">
                        <h3 style={headingStyle}>About me</h3>
                        <p style={textStyle}>
                            Hi I’m Katy
                        </p>
                        <p style={textStyle}>
                            I started working full-time and paying rent from a young age and when
                            I hit 25 I realised that most of the things I had been dreaming about
                            were still that, just dreams. So I made some big changes, moved to a
                            brand new city, made a whole bunch of new friends and now, nearly 4 years
                            later myself and my partner built our own tiny home on wheels and drove
                            it all the way to Turkey and back. I’ve fully embraced this “alternative”
                            lifestyle and tiny living, my passion for travelling is ever growing and
                            my love for food and creating new dishes is always expanding. So if
                            you’re a keen traveller, looking for new recipes and/or want to know more
                            about tiny living and living alternatively this should be the right space
                            for you.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <img src={AboutImage} style={aboutImageStyle}/>
                    </div>
                </Row>
            </Container>
        );
    }
}