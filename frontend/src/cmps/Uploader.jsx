import { Component } from 'react'
import { cloudinaryService } from '../service/cloudinaryService'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export class Uploader extends Component {
  state = {
    imgUrl: null,
    isUploading: false
  }

  onUploadImg = async ev => {
    this.setState({ isUploading: true })
    const { secure_url } = await cloudinaryService.uploadImg(ev.target.files[0])
    this.setState({ imgUrl: secure_url, isUploading: false })
    this.props.onFinishUpload(secure_url)
  }
  
  render() {
    const { imgUrl, isUploading} = this.state
    const uploadStyle = {
      backgroundImage: `url(${imgUrl})`
    }
    

    return (
      <div>
        {!imgUrl && <label className="uploader-label" htmlFor="imageUploader">
          {isUploading ? 'Uploading....' : ''}
          <CloudUploadIcon className="uploading-img"></CloudUploadIcon>
        </label>}
        <input onChange={this.onUploadImg} hidden
          type="file" accept="image/*" id="imageUploader" />
        {imgUrl && <div className="uploader"
          style={uploadStyle} >
        </div>}
      </div>

    )
  }
}
