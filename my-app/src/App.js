import React from 'react'
import './App.css'
import Header from './components/navbar'
import PredictionResult from './components/predResult' 
import UploadImage from './components/uploadImage'
import { Container, Row } from 'react-bootstrap'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      prediction: [],
    }
  }

  updatePredict = prediction => {
    this.setState({prediction: [...prediction]})
  }


  render() {
    return (
      <div className="body d-flex flex-column"> 
        <Header title="Plant disease detection" />
        <Container className="main-container" fluid d-flex>
          <Row className="main-row"> 
            <UploadImage onSubmit={this.updatePredict}/>
            <PredictionResult prediction={this.state.prediction}/>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;
