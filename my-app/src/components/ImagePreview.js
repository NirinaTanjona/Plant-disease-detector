import React from 'react';
import './../App.css'


class ImagePreview extends React.Component {

    render() {
        let imagePreviewUrl = this.props.imagePreview
        return (
          <div className="mt-3 mb-3 imagePreview-container">
            { imagePreviewUrl && (
              <img className="image-uploaded" src={imagePreviewUrl} alt="" />
              )
            }
          </div>
        )
    }
}

export default ImagePreview
