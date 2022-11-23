import React from "react";

export class ErrorText extends React.Component {
    constructor(props) {
        super(props);

        this.errorText = props.error;
    }

    render() {
        return (
            <small className="text-danger">{this.errorText}</small>
        );
    }
}