import React, { Component } from "react";
import Section from "../components/Section";

class FakeSheet extends Component {
    click = (e) => {
        console.log("click class " + e.target.className)
    }
    render() {
        return (
            <div className="sheet__root" onClick={this.click}>
                <Section></Section>
            </div>
        );
    }
}

export default FakeSheet;

