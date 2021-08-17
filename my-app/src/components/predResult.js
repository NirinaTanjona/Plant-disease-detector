import React from 'react'
import Predict from './Predict'
import { compareConfidence } from './utils'
import '../App.css'
import Col from 'react-bootstrap/Col'


export default class PredictionResult extends React.Component {
  render() {
    return (
      <Col md className="mt-3 mb-5 prediction-result border-left">
        <h1 className="prediction-result-title">Prediction  
          <span className="prediction-result-blue-title"> Result</span>
        </h1>
        <div>
          {this.props.prediction
            .filter(predict => (predict.confidence > 0.10))
            .sort(compareConfidence)
            .map(predict => (
              <Predict key={predict.index} {...predict} />
            ))}
        </div>
      </Col>
    )
  }
}
