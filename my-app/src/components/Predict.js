import React from 'react';

class Predict extends React.Component {

    render() {
        return (
            <div>
                <ul>
                    <h3>{this.props.disease} : {this.props.confidence}</h3>
                </ul>
            </div>
        )
    }
}

export default Predict
