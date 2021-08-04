import React from 'react';
import './../App.css'


class ImagePreview extends React.Component {

    render() {
        let imagePreviewUrl = this.props.imagePreview
        return (
            imagePreviewUrl ?
                (<img src={imagePreviewUrl} alt="" height="100%" />) :
                (<div>
                    Please select an image
                </div>)
        )
    }
}

export default ImagePreview
