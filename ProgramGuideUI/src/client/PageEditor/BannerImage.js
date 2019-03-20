import React, { Component } from 'react';
import Down from './DownIcon.png';
import BannerImagePreview from '../Modal/BannerImagePreview';
import { connect } from 'react-redux';

class BannerImage extends Component {

    constructor() {
        super();
        this.objBannerImage = {};
        this.state = {
            showBannerPreview: false,
        }
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
        this.objBannerImage.BannerImage = this.refs.BannerImage.value;
        this.props.getBannerImageData(this.objBannerImage);
    }

    resetModal() {
        this.setState({ showBannerPreview: false });
    }

    render() {
        return (
            <div className="card">
                <div className="card-header" id="BannerImage">
                    <p data-toggle="collapse" data-target="#collapseBannerImage" aria-expanded="true" aria-controls="collapseBannerImage"> <strong >
                        Banner Image  <span className="floatLeft"> <img src={Down} alt="Logo" /></span>
                    </strong></p>
                </div>
                {this.state.showBannerPreview ? <BannerImagePreview treeData={this.props.storeData._bannerImageData['treeStructure']} data={this.props.storeData._bannerImageData['BannerImageUrl']} ModalClosed={this.resetModal.bind(this)} setImagePath={this.fetch.bind(this)} /> : ''}
                <div id="collapseBannerImage" className="collapse" aria-labelledby="BannerImage" data-parent="#pageEditorSection">
                    <div className="card-body">
                        <strong> Banner Image Path: </strong>
                        <br />
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control input-sm" id="txtBannerImage" defaultValue={this.props.setBannerImageData} ref="BannerImage" onBlur={this.onBlur.bind(this)} />
                            <span className="input-group-btn">
                                <button id="browseBannerImage" className="btn btn-primary btn-modal" type="submit" onClick={this.browseImage.bind(this)} >Browse</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state, props) => { return { storeData: state } })(BannerImage);
