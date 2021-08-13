import React from 'react'
import Predict from './Predict'
import { compareConfidence } from './utils'

export default class PredictionResult extends React.Component {

  render() {
    return (
      <div>
        {this.props.prediction
          .filter(predict => (predict.confidence > 0.10))
          .sort(compareConfidence)
          .map(predict => (
            <Predict key={predict.index} {...predict} />
          ))}
      </div>
    )
  }
}
