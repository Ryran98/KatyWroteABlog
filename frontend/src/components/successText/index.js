import React from "react";

export class SuccessText extends React.Component {
    constructor(props) {
        super(props);

        this.successText = props.success;
    }

    render() {
        return (
            <small className="text-success">{this.successText}</small>
        );
    }
}