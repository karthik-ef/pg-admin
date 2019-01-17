import React, { Component } from 'react';

import Down from './DownIcon.png';
import BannerImagePreview from '../Modal/BannerImagePreview';
import $ from 'jquery';

class BannerImage extends Component {

    constructor() {
        super();
        this.objBannerImage = {};
        this.state = {
            showBannerPreview: false,
            createBannerImage: []
        }
    }

    componentDidMount() {
        this.getBannerImage();
    }

    getBannerImage() {
        $.ajax({
            url: 'http://ctdev.ef.com:3000/BannerImage',
            type: 'GET',
            cache: false,
            success: function (data) {
                this.setState({createBannerImage: JSON.parse(data)});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    // Pass MetaInformation data to parent component 
    onBlur() {
        this.objBannerImage.BannerImage = this.refs.BannerImage.value;
        this.props.getBannerImageData(this.objBannerImage);
    }

    browseImage() {
        this.setState({ showBannerPreview: true });
    }

    fetch = (value) => {
        console.log(value);
        this.setState({ showBannerPreview: false });
        this.refs.BannerImage.value = value;
    }

    resetModal() {
        this.setState({ showBannerPreview: false });
    }

    render() {
        console.log(this.state.createBannerImage['a']);
        return (
            <div class="card">
                <div class="card-header" id="BannerImage">
                    <p data-toggle="collapse" data-target="#collapseBannerImage" aria-expanded="true" aria-controls="collapseBannerImage"> <strong >
                        Banner Image  <span className="floatLeft"> <img src={Down} alt="Logo" /></span>
                    </strong></p>
                </div>
                {this.state.showBannerPreview ? <BannerImagePreview treeData = {this.state.createBannerImage['treeStructure']} data = {this.state.createBannerImage['BannerImageUrl']} ModalClosed={this.resetModal.bind(this)} setImagePath={this.fetch.bind(this)} /> : ''}
                <div id="collapseBannerImage" class="collapse" aria-labelledby="BannerImage" data-parent="#pageEditorSection">
                    <div class="card-body">
                        <strong> Banner Image Path: </strong>
                        <br />
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control input-sm" id="txtBannerImage" defaultValue={this.props.setBannerImageData} ref="BannerImage" onBlur={this.onBlur.bind(this)} />
                            <span class="input-group-btn">
                                <button id="browseBannerImage" class="btn btn-primary btn-modal" type="submit" onClick={this.browseImage.bind(this)} >Browse</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BannerImage;
