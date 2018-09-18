import React, { Component } from 'react';
import ExpandIcon from '../Icons/Plus.png';
import ShrinkIcon from '../Icons/Minus.png';
import ReactTable from "react-table";
import $ from 'jquery';
import Preview from './FeaturePreview';
import TextBox from '../CustomControls/TextBox';
import LinkingPagesPreview from './LinkingPagesPreview';

let objDrillDown = {}, getCustomizedLinksData, newLinkingPageURL;

class DrillDown extends Component {

    constructor() {
        super();
        this.objDrillDown = {};
        this.getCustomizedLinksData = [];
        this.newLinkingPageURL = {}
        this.state = {
            showTag1Preview: false,
            showTag2Preview: false,
            showCustomizedTags: false
        }
    }

    componentDidMount() {
        this.getCustomizedLinks();
        $('#featurePageTag1Preview').click(function () {
            if ($(this).text() === 'Preview') {
                $('.card').attr('id', 'drillDownPreview');
                $(this).text('Hide');
            }
            else {
                $('.card').attr('id', 'drillDownHide');
                $(this).text('Preview');
            }
        });
        $('#featurePageTag2Preview').click(function () {
            if ($(this).text() === 'Preview') {
                $('.card').attr('id', 'drillDownPreview');
                $(this).text('Hide');
            }
            else {
                $('.card').attr('id', 'drillDownHide');
                $(this).text('Preview');
            }
        });
    }

    // Pass MetaInformation data to parent component 
    onChange() {
        if ($('#featurePageTag1Preview').text() !== 'Preview') {
            $('#collapseFeaturePageTag1').collapse('toggle');
            $('.card').attr('id', 'drillDownHide');
            $('#featurePageTag1Preview').text('Preview');
            this.setState({ showTag1Preview: false });
        }
        else if ($('#featurePageTag2Preview').text() !== 'Preview') {
            $('#collapseFeaturePageTag2').collapse('toggle');
            $('.card').attr('id', 'drillDownHide');
            $('#featurePageTag2Preview').text('Preview');
            this.setState({ showTag2Preview: false });
        }
        this.objDrillDown.FeaturePageTag1 = this.refs.FeaturePageTag1.value;
        this.objDrillDown.FeaturePageTag2 = this.refs.FeaturePageTag2.value;
        this.props.getDrillDownData(this.objDrillDown);
    }

    tag1PreviewOnClick() {
        this.setState({ showTag1Preview: true });
    }

    tag2PreviewOnClick() {
        this.setState({ showTag2Preview: true });
    }

    onBlur() {
        $('.card').attr('id', '');
    }

    getSelectedValue = (value) => {
        if (this.getCustomizedLinksData.filter(m => m.PageUrl === value).length === 0 &&
            this.props.UniqueContentData.filter(m => m.PageUrl === value).length !== 0) {
            this.newLinkingPageURL = this.props.UniqueContentData.filter(m => m.PageUrl === value).map(m => { return { UniqueContent_ID: m.UniqueContent_ID, PageUrl: m.PageUrl, PageTitle: m.PageTitle, BannerImage: '', LabelTag: '' } });
        }
        else {
            this.newLinkingPageURL = {}
        }
    }

    getCustomizedLinks() {
        console.log(this.props.setDrillDownData['UniqueContent_ID'])
        $.ajax({
            url: 'http://ctdev.ef.com:3000/getCustomizedLinks/?UniqueContent_ID=' + this.props.setDrillDownData['UniqueContent_ID'],
            type: 'GET',
            cache: false,
            success: function (data) {
                this.getCustomizedLinksData = data
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    ShowCustomizedTags() {
        if ($('#customizedTagsPreview').text() === 'Show Customized Tags') {
            this.setState({ showCustomizedTags: true });
            $('#customizedTagsPreview').text('Hide Customized Tags');
        }
        else {
            $('#customizedTagsPreview').text('Show Customized Tags');
            this.newLinkingPageURL = {};
            this.setState({ showCustomizedTags: false });
        }
    }

    RemoveLinkingPage = (value) => {
        this.getCustomizedLinksData = this.getCustomizedLinksData.filter(m => m.PageUrl !== value['PageUrl']);
        this.objDrillDown.CustomizedLinksData = '<CustomizedLinks>' + this.getCustomizedLinksData.map(m => {return '<LinkingPages Id="' + m.UniqueContent_ID + '"/>'}).toString().replace(/,/g, ' ') + '</CustomizedLinks>';
        this.props.getDrillDownData(this.objDrillDown);
        this.setState({ showCustomizedTags: true });
    }

    AddLinkingPage() {
        if (this.newLinkingPageURL.length !== undefined) {
            this.getCustomizedLinksData.push(this.newLinkingPageURL[0]);
            this.objDrillDown.CustomizedLinksData = '<CustomizedLinks>' + this.getCustomizedLinksData.map(m => {return '<LinkingPages Id="' + m.UniqueContent_ID + '"/>'}).toString().replace(/,/g, ' ') + '</CustomizedLinks>';
            this.props.getDrillDownData(this.objDrillDown);
            this.setState({ showCustomizedTags: true });
        }
    }
    render() {
        return (
            <div class="card">
                <div class="card-header" id="DrillDown">
                    <p data-toggle="collapse" data-target="#collapseDrillDown" aria-expanded="true" aria-controls="collapseDrillDown"> <strong >
                        Drill down  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                    </strong></p>
                </div>

                <div id="collapseDrillDown" class="collapse" aria-labelledby="DrillDown" data-parent="#pageEditorSection">
                    <div class="card-body">
                        {/* Feature Tag 1 Content */}
                        <strong> Feature Tag Page 1: </strong>
                        <br />
                        <div class="Yes">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <input type="text" class="form-control input-sm" id="txtFeaturePageTag1" defaultValue={this.props.setDrillDownData['FeaturePageTag1']} ref="FeaturePageTag1" onChange={this.onChange.bind(this)} />
                                        <span class="input-group-btn">
                                            <button id="featurePageTag1Preview" data-toggle="collapse" data-target="#collapseFeaturePageTag1" aria-expanded="true" aria-controls="collapseFeaturePageTag1" class="btn btn-primary btn-sm" type="submit" onBlur={this.onBlur} onClick={this.tag1PreviewOnClick.bind(this)} >Preview</button>
                                        </span>
                                    </div>
                                    <div id="collapseFeaturePageTag1" class="collapse" aria-labelledby="DrillDown" data-parent="featurePageTag1Button">
                                        {this.state.showTag1Preview ?
                                            <Preview UniqueContentData={this.props.UniqueContentData} setData={this.objDrillDown.FeaturePageTag1 === undefined ? this.props.setDrillDownData['FeaturePageTag1'] : this.objDrillDown.FeaturePageTag1} /> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        {/* Feature Tag 2 Content */}
                        <strong> Feature Tag Page 2: </strong>
                        <br />
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control input-sm" id="txtFeaturePageTag2" defaultValue={this.props.setDrillDownData['FeaturePageTag2']} ref="FeaturePageTag2" onChange={this.onChange.bind(this)} />
                                    <span class="input-group-btn">
                                        <button id="featurePageTag2Preview" data-toggle="collapse" data-target="#collapseFeaturePageTag2" aria-expanded="true" aria-controls="collapseFeaturePageTag2" class="btn btn-primary btn-sm" type="submit" onBlur={this.onBlur} onClick={this.tag2PreviewOnClick.bind(this)} >Preview</button>
                                    </span>
                                </div>
                                <div id="collapseFeaturePageTag2" class="collapse" aria-labelledby="DrillDown" data-parent="featurePageTag2Button">
                                    {this.state.showTag2Preview ?
                                        <Preview UniqueContentData={this.props.UniqueContentData} setData={this.objDrillDown.FeaturePageTag2 === undefined ? this.props.setDrillDownData['FeaturePageTag2'] : this.objDrillDown.FeaturePageTag2} /> : ''}
                                </div>
                            </div>
                        </div>
                        <br />
                        {/* Feature Tag 2 Content */}
                        <strong> Feature Tag Page 3: </strong>
                        <br />
                        <button id="customizedTagsPreview" class="btn btn-primary btn-sm" type="submit" onClick={this.ShowCustomizedTags.bind(this)}>Show Customized Tags</button>
                        <br />
                        {this.state.showCustomizedTags
                            ? <div> <LinkingPagesPreview setLinkingPageData={this.getCustomizedLinksData} DeleteRow={this.RemoveLinkingPage.bind(this)} /> <br />
                                <div class="input-group input-group-sm" >
                                    <TextBox PageUrl={this.props.UniqueContentData.filter(m => m.IsActive).map(m => { return { name: m.PageUrl } })} selectedValue={this.getSelectedValue.bind(this)} />
                                    <button class="btn btn-primary btn-sm" type="submit" onClick={this.AddLinkingPage.bind(this)}>Add linking page </button>
                                </div> </div> : ''}

                    </div>
                </div>
            </div>
        );
    }
}

export default DrillDown;
