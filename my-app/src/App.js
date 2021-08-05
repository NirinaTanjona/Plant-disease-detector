import React from 'react'
import Predict from './components/Predict'
import Container from 'react-bootstrap/Container'
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
        <h2>Upload a plant photo file</h2>
        <Button variant="primary" onClick={this._handleUploadImage}>Upload</Button>
        <div>
          <form>
            <input type="file" onChange={this._handleImageChange} />
          </form>
          <div>
            <ImagePreview imagePreview={this.state.imagePreviewUrl} />
          </div>
          <div>
            {this.state.prediction
              .filter(predict => (predict.confidence > 0.10))
              .sort(compareConfidence)
              .map(predict => (
                <Predict key={predict.index} {...predict} />
              ))}
          </div>
        </div>
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
