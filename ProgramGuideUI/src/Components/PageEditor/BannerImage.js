import React, { Component } from 'react';
import ExpandIcon from '../Icons/Plus.png';
import ShrinkIcon from '../Icons/Minus.png';
import SearchByTag from '../SearchResult/SearchByTag';

let objBannerImage = {}

class BannerImage extends Component {

    onBlur() {
        objBannerImage.BannerImage = this.refs.BannerImage.value;
        this.props.getBannerImageData(objBannerImage);
    }

    render() {
        return (
            <div class="card">
                <div class="card-header" id="BannerImage">
                    <p data-toggle="collapse" data-target="#collapseBannerImage" aria-expanded="true" aria-controls="collapseBannerImage"> <strong >
                        Banner Image  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                    </strong></p>
                </div>
                <div id="collapseBannerImage" class="collapse" aria-labelledby="BannerImage" data-parent="#accordionExample">
                    <div class="card-body">
                        <strong> Banner Image Path: </strong>
                        <br />
                        <input type="text" class="form-control input-sm" defaultValue={this.props.setBannerImageData} ref="BannerImage" onBlur = {this.onBlur.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default BannerImage;
