import React from "react";

export class Loading extends React.Component {
    constructor(props) {
        super(props);

        if (props.dotType == null)
            this.dotType = "dot-bricks";
        else
            this.dotType = props.dotType;
        
        this.children = props.children;
    }

    render() {
        return (
            <div className="text-center">
                <div className="stage">
                    <div className={this.dotType} />
                </div>
                {this.children}
            </div>
        );
    }
}