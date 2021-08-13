import React from 'react'
import './App.css'
import Navbar from './components/navbar'
import PredictionResult from './components/predResult' 
import UploadImage from './components/uploadImage'
import { Container, Row, Col } from 'react-bootstrap'


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
      <Container fluid className="body"> 
        <Navbar title="Plant disease detection" />
        <Row>
          <Col md><UploadImage onSubmit={this.updatePredict}/></Col>
          <Col md><PredictionResult prediction={this.state.prediction}/></Col>
        </Row>
      </Container>
    )
  }
}

export default App;
