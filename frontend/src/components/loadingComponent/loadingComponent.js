import React from "react";
import { Card, CardBody } from "reactstrap";
import { CenterPiece } from "../centerPiece";
import { Loading } from "./loading";

export class LoadingComponent extends React.Component {
    constructor(props) {
        super(props);

        if (props.card == null)
            this.card = true;
        else
            this.card = props.card;

        if (props.dotType == null)
            this.dotType = "dot-bricks";
        else
            this.dotType = props.dotType;

        this.children = props.children;
    }

    render() {
        if (this.card) {
            return (
                <CenterPiece>
                    <Card className="text-center">
                        <CardBody>
                            <Loading dotType={this.dotType}>
                                {this.children}
                            </Loading>
                        </CardBody>
                    </Card>
                </CenterPiece>
            );
        }

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