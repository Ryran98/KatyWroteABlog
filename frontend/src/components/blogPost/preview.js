import { Container, Row } from "reactstrap";
import DefaultImage from "../../images/LondonTravelImage.jpg";

const containerStyle = {
    borderColor: "lightgrey",
    borderStyle: "solid",
    borderWidth: "1px",
    maxWidth: "40vw"
};

const imageStyle = {
    maxHeight: "30vh"
};

const createdDateStyle = {
    color: "grey"
}

export function BlogPostPreview(props) {
    const leveningStr = (data, amount) => {
        let string = data.split(/<\/?[\w"= -]*>/);
        string = string.reduce((data, one) => data += one + " ");
        string = string.substr(0, amount);
        return `${string} ...`;
    };
    
    return (
        <Container fluid style={containerStyle}>
            <Row>
                <img src={props.image ?? DefaultImage} style={imageStyle} />
                <div className="pl-5">
                    <Row>
                        <h3>{props.title}</h3>
                    </Row>
                    <Row>
                        <i style={createdDateStyle}>{props.createdDate}</i>
                    </Row>
                    <Row>
                        {leveningStr(props.content, 250)}
                    </Row>
                </div>
            </Row>
        </Container>
    );
}