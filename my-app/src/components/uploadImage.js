import React from 'react'
import { fetchPredict } from './api'
import Button from 'react-bootstrap/Button'
import ImagePreview from './ImagePreview'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { CloudUploadOutline } from 'react-ionicons'
import Spinner from 'react-bootstrap/Spinner'


export default class UploadImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: '',
      imagePreview: '',
      isLoading: false,
    }
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
    if (!this.state.selectedFile) return 
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    data.append('filename', this.state.selectedFile.name)

    this.getPredict(data)
    this.setState({ selectedFile: '' })
  }

  getPredict = async (data) => {
    this.setState({ isLoading: true })
    const result = await fetchPredict(data)
    this.props.onSubmit([...result])
    this.setState({ isLoading: false })
  }


  render() {
    return (
      <Col md>
        <Container fluid className="d-flex align-items-center text-center"> 
          <Card className="m-3 card-container">
            <Card.Header><h1>Upload Plant Image</h1></Card.Header>
              <Card.Body className="card-container">
                <form>
                  <input type="file" name="file" id="file" class="inputfile"  onChange={this._handleImageChange} />
                    <label for="file">
                      <CloudUploadOutline 
                        className="uploadIcon"
                        color={'rgba(26,26,26,.75'}
                      />
                      choose file
                    </label>
                </form>
                <ImagePreview className="test" imagePreview={this.state.imagePreviewUrl} />
                <Button 
                  variant="primary" 
                  onClick={this._handleUploadImage}>
                  {!this.state.isLoading ? <span>detect disease</span>: <span><Spinner className="mr-3" animation="grow" size="sm" />  searching...</span>} 
                </Button>
              </Card.Body>
          </Card>
        </Container>
      </Col>
    )
  }
}
