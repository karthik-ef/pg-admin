import React, { Component } from 'react';
import Down from './DownIcon.png';

class MetaInformation extends Component {

    constructor(){
        super();
        this.objMetaInformation = {};
    }

    // Pass MetaInformation data to parent component 
    onBlur(){
        this.objMetaInformation.MetaTitle = this.refs.MetaTitle.value;
        this.objMetaInformation.MetaDescription = this.refs.MetaDescription.value;
        this.objMetaInformation.MetaRobot = this.refs.MetaRobot.value;
        this.props.MetaInformation(this.objMetaInformation)
    }

    render() {
        return (
            <div class="card">
            <div class="card-header" id="MetaInformation">
                <p data-toggle="collapse" data-target="#collapseMetaInformation" aria-expanded="true" aria-controls="collapseMetaInformation"> <strong >
                    Meta Information  <span className="floatLeft"> <img src={Down} alt="Logo" /></span>
                </strong></p>
            </div>

            <div id="collapseMetaInformation" class="collapse" aria-labelledby="MetaInformation" data-parent="#pageEditorSection">
                <div class="card-body">
                    <strong> Meta Title: </strong>
                    <br />
                    <input type="text" class="form-control" defaultValue={this.props.data['MetaTitle']} ref="MetaTitle" onBlur = {this.onBlur.bind(this)} />
                    <br />
                    <strong> Meta Description: </strong>
                    <textarea class="form-control" rows="5" defaultValue={this.props.data['MetaDescription']} ref="MetaDescription" onBlur = {this.onBlur.bind(this)}></textarea>
                    <br />
                    <strong> Meta Robot: </strong>
                    <input type="text" class="form-control" readOnly={JSON.parse(localStorage.getItem('Role')) !== 'Admin' ? true : false} defaultValue={this.props.data['MetaRobot']} ref="MetaRobot" onBlur = {this.onBlur.bind(this)}/>
                </div>
            </div>
        </div>
        );
    }
}

export default MetaInformation;
