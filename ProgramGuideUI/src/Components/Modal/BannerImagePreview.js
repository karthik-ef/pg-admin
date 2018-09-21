import React, { Component } from 'react';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import $ from 'jquery';


import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './1.jpg';
import img6 from './2.jpg';
import img7 from './3.jpg';
import img8 from './4.jpg';
import img9 from './1.jpg';
import img10 from './2.jpg';
import img11 from './3.jpg';
import img12 from './4.jpg';

const imageList = [img1, img2, img3, img4,
    img5, img6, img7, img8, img9, img10, img11, img12]

class BannerImagePreview extends Component {

    constructor() {
        super();
        this.bannerImagePath = '';
    }

    componentDidMount() {
        $('#bannerImage').modal('show');
    }

    setImagePath(){
        this.props.setImagePath(this.bannerImagePath);
        $('#bannerImage').modal('hide');
    }

    onPick(image){
        this.bannerImagePath = image;
    }

    handleCloseClick(){
        $('#bannerImage').modal('hide');
        this.props.ModalClosed(true);
    }


    render() {
        return (
            <div class="modal hide fade" id="bannerImage" tabindex="-1" role="dialog" aria-labelledby="bannerImageTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" aria-label="Close" onClick={this.handleCloseClick.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id="bannerImageModalBody">
                            <div id="ImagePicker">
                                <ImagePicker
                                    images={imageList.map((image, i) => ({ src: image, value: i }))}
                                    onPick={this.onPick.bind(this)}
                                />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-primary" onClick = {this.setImagePath.bind(this)}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BannerImagePreview;
