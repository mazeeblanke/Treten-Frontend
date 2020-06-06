import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import { convertToDataURL } from '../../lib/helpers'

class Cropper extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: '%',
      width: 30,
      // aspect: 16 / 9,
      aspect: 0,
    },
	};
	
	componentDidMount () {
		// const img = new Image;
		// img.onload = () => {
		// 	// const reader = new FileReader();
    //   // reader.addEventListener('load', () =>
    //     this.setState({ src: img.src })
		// 	// );
		// 	console.log(img)
			
    //   // reader.readAsDataURL(img);
		// }
		convertToDataURL(this.props.src, (url) => {
			this.setState({ src: url })
		})
		// img.src = this.props.src
		// if (this.props.src instanceof File) {

		// } else {
		// 	this.setState({ src: this.props.src })
		// }
	}

  // onSelectFile = e => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () =>
  //       this.setState({ src: reader.result })
  //     );
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const [croppedImageUrl, fileBlob] = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
			this.props.onCroppedImageUrl && this.props.onCroppedImageUrl(croppedImageUrl)
			this.props.onBlobChange && this.props.onBlobChange(fileBlob)
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve([this.fileUrl, blob]);
      }, 'image/jpeg');
    });
  }

  render() {
    const { crop, src } = this.state;

    if (this.props.aspect) {
      crop.aspect = this.props.aspect
    }

    return (
      <div className="App">
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
      </div>
    );
  }
}

export default Cropper