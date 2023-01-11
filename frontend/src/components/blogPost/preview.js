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
        let string = data.split(/<\/?[\w"=+ \-\\',;:\/]*\/?>/);
        string = string.reduce((data, one) => data += one + " ");
        string = string.substr(0, amount);
        return `${string} ...`;
    };

    if (props.isDraft)
    return <div></div>;

    return (
        <Container fluid className="mb-3" style={containerStyle}>
            <a style={{ display: "block" }} href={`/blog/post/${props.id}`}>
            <Row>
                <img className="col-6 pl-0" src={props.image} style={imageStyle} />
                <div className="col-6 pl-4 mt-2">
                    <Row>
                        <h3 style={{color: "black"}}>{props.title}</h3>
                    </Row>
                    <Row>
                        <i style={createdDateStyle}>{props.createdDate}</i>
                    </Row>
                    <Row>
                        <div style={{color: "black"}}>
                            {leveningStr(props.content, 200)}
                        </div>
                    </Row>
                </div>
            </Row>
            </a>
        </Container >
    );
}