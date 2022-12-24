import React from "react";

export function ErrorText (props) {
    return (
        <small className="text-danger">{props.error}</small>
    );
}