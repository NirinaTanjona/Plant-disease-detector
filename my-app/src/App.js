import React from 'react'
import Predict from './components/Predict'
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { compareConfidence } from './components/utils'
import ImagePreview from './components/ImagePreview'
import { fetchPredict } from './components/api'
import './App.css'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedFile: '',
      imagePreviewUrl: '',
      prediction: [],
    }
  }

  render() {
    return (
      <Container fluid className="body"> 
        <h1 className="title">Plant disease detection</h1>
        <Row>
          <Col md style={{ border: '1px solid black' }}>
            <Button variant="primary" onClick={this._handleUploadImage}>Upload</Button>
            <form>
              <input type="file" onChange={this._handleImageChange} />
            </form>
            <div>
              <ImagePreview imagePreview={this.state.imagePreviewUrl} />
            </div>
          </Col>
          <Col md style={{ border: '1px solid black' }}>
            <div>
              {this.state.prediction
                .filter(predict => (predict.confidence > 0.10))
                .sort(compareConfidence)
                .map(predict => (
                  <Predict key={predict.index} {...predict} />
                ))}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  _handleImageChange = (e) => {
    e.preventDefault()

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        selectedFile: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  _handleUploadImage = (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('file', this.state.selectedFile)
    data.append('filename', this.state.selectedFile.name)

    this.getPredict(data)
  }

  getPredict = async (data) => {
    const result = await fetchPredict(data)
    this.setState({ prediction: result })
  }
}

export default App;
