import React from "react";

export class EditBlogPage extends React.Component {
    constructor(props) {
        super(props);

        this.blogId = props.blogId;
    }
    
    render() {
        return (
            <div>Edit page</div>
        );
    }
}