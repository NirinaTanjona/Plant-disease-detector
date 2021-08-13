import React from 'react'
import { fetchPredict } from './api'
import Button from 'react-bootstrap/Button'
import ImagePreview from './ImagePreview'


export default class UploadImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: '',
      imagePreview: '',
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

    const data = new FormData()
    data.append('file', this.state.selectedFile)
    data.append('filename', this.state.selectedFile.name)

    this.getPredict(data)
  }

  getPredict = async (data) => {
    const result = await fetchPredict(data)
    this.props.onSubmit([...result])
  }


  render() {
    return (
      <div>
        <Button variant="primary" onClick={this._handleUploadImage}>Upload</Button>
        <form>
          <input type="file" onChange={this._handleImageChange} />
        </form>
        <div>
          <ImagePreview imagePreview={this.state.imagePreviewUrl} />
        </div>
      </div>
    )
  }
}
