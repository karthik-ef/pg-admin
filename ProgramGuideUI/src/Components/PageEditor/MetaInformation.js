import React, { Component } from 'react';
import ExpandIcon from '../Icons/Plus.png';
import ShrinkIcon from '../Icons/Minus.png';

let objMetaInformation = {}

class MetaInformation extends Component {


    // Pass MetaInformation data to parent component 
    onBlur(){
        objMetaInformation.MetaTitle = this.refs.MetaTitle.value;
        objMetaInformation.MetaDescription = this.refs.MetaDescription.value;
        objMetaInformation.MetaRobot = this.refs.MetaRobot.value;
        this.props.MetaInformation(objMetaInformation)
    }

    render() {
        return (
            <div class="card">
            <div class="card-header" id="MetaInformation">
                <p data-toggle="collapse" data-target="#collapseMetaInformation" aria-expanded="true" aria-controls="collapseMetaInformation"> <strong >
                    Meta Information  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                </strong></p>
            </div>

            <div id="collapseMetaInformation" class="collapse" aria-labelledby="MetaInformation" data-parent="#accordionExample">
                <div class="card-body">
                    <strong> Meta Title: </strong>
                    <br />
                    <input type="text" class="form-control" defaultValue={this.props.data['MetaTitle']} ref="MetaTitle" onBlur = {this.onBlur.bind(this)} />
                    <br />
                    <strong> Meta Description: </strong>
                    <textarea class="form-control" rows="5" defaultValue={this.props.data['MetaDescription']} ref="MetaDescription" onBlur = {this.onBlur.bind(this)}></textarea>
                    <br />
                    <strong> Meta Robot: </strong>
                    <input type="text" class="form-control" readOnly={true} defaultValue={this.props.data['MetaRobot']} ref="MetaRobot" onBlur = {this.onBlur.bind(this)}/>
                </div>
            </div>
        </div>
        );
    }
}

export default MetaInformation;
