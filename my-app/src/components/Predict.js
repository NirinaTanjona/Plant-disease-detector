import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

class Predict extends React.Component {
  constructor(props) {
    super(props)
    this.now = this.props.confidence * 100
  }

  removeUnderscore = () => {
    const x = this.props.disease.replace(/___/g, "~ ")
    return x.replace(/_/g, " ")
  }


  render() {
    return (
      <div>
        <h3 className="disease-name">{this.removeUnderscore()}</h3>
        <ProgressBar now={this.now} label={`${this.now}%`} /> 
      </div>
    )
  }
}

export default Predict
