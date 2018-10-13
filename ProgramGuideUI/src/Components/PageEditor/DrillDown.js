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

        this.getFeatureTag3Results = [];
        this.getCustomizedFeatureTagResults = [];

        this.isTag1Valid = true;
        this.isTag2Valid = true;
        this.isDrillDownTagValid = true;
        this.state = {
            showTag1Preview: false,
            showTag2Preview: false,
            showDrillDownAlias: false,
            showCustomizedTags: false,
            showFeatureTag3Pages: false
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

        $('#DrillDownAliasPreview').click(function () {
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
            this.isTag1Valid = true;
            this.setState({ showTag1Preview: false });
        }
        else if ($('#featurePageTag2Preview').text() !== 'Preview') {
            $('#collapseFeaturePageTag2').collapse('toggle');
            $('.card').attr('id', 'drillDownHide');
            $('#featurePageTag2Preview').text('Preview');
            this.isTag2Valid = true;
            this.setState({ showTag2Preview: false });
        }

        else if ($('#DrillDownAliasPreview').text() !== 'Preview') {
            $('#collapseDrillDownAlias').collapse('toggle');
            $('.card').attr('id', 'drillDownHide');
            $('#DrillDownAliasPreview').text('Preview');
            this.isDrillDownTagValid = true;
            this.setState({ showDrillDownAliasPreview: false });
        }


        this.objDrillDown.FeaturePageTag1 = this.refs.FeaturePageTag1.value;
        this.objDrillDown.FeaturePageTag2 = this.refs.FeaturePageTag2.value;
        this.objDrillDown.DrillDownAlias = this.refs.DrillDownAlias.value;
        this.props.getDrillDownData(this.objDrillDown);
    }

    tag1PreviewOnClick() {
        var arrSelectedTags = this.refs.FeaturePageTag1.value.toString().split('_');
        var filterCriteria = [
            // { Field: "Tag_Experience", Values: arrSelectedTags[0] },
            { Field: "Tag_Topic", Values: arrSelectedTags[0] },
            { Field: "Tag_When", Values: arrSelectedTags[1] },
            { Field: "Tag_CourseType", Values: arrSelectedTags[2] },
            { Field: "Tag_AgeRange", Values: arrSelectedTags[3] },
            { Field: "Tag_Duration", Values: arrSelectedTags[4] },
            { Field: "Tag_LanguageOfInstruction", Values: arrSelectedTags[5] },
            { Field: "Tag_LanguageLearned", Values: arrSelectedTags[6] },
            { Field: "Tag_Platform", Values: arrSelectedTags[7] },
            { Field: "Tag_Continent", Values: arrSelectedTags[8] },
            { Field: "Tag_Country", Values: arrSelectedTags[9] },
            { Field: "Tag_State", Values: arrSelectedTags[10] },
            { Field: "Tag_City", Values: arrSelectedTags[11] },
            { Field: "Tag_Feature", Values: arrSelectedTags[12] }
        ];

        if (filterCriteria.filter(m => m.Values === undefined || m.Values === '').length > 0) {
            this.isTag1Valid = false;
        }
        else {
            this.isTag1Valid = true;
        }
        this.setState({ showTag1Preview: true });
    }

    tag2PreviewOnClick() {
        var arrSelectedTags = this.refs.FeaturePageTag2.value.toString().split('_');
        var filterCriteria = [
            // { Field: "Tag_Experience", Values: arrSelectedTags[0] },
            { Field: "Tag_Topic", Values: arrSelectedTags[0] },
            { Field: "Tag_When", Values: arrSelectedTags[1] },
            { Field: "Tag_CourseType", Values: arrSelectedTags[2] },
            { Field: "Tag_AgeRange", Values: arrSelectedTags[3] },
            { Field: "Tag_Duration", Values: arrSelectedTags[4] },
            { Field: "Tag_LanguageOfInstruction", Values: arrSelectedTags[5] },
            { Field: "Tag_LanguageLearned", Values: arrSelectedTags[6] },
            { Field: "Tag_Platform", Values: arrSelectedTags[7] },
            { Field: "Tag_Continent", Values: arrSelectedTags[8] },
            { Field: "Tag_Country", Values: arrSelectedTags[9] },
            { Field: "Tag_State", Values: arrSelectedTags[10] },
            { Field: "Tag_City", Values: arrSelectedTags[11] },
            { Field: "Tag_Feature", Values: arrSelectedTags[12] }
        ];

        if (filterCriteria.filter(m => m.Values === undefined || m.Values === '').length > 0) {
            this.isTag2Valid = false;
        }
        else {
            this.isTag2Valid = true;
        }
        this.setState({ showTag2Preview: true });
    }

    DrillDownAliasPreviewOnClick() {

        var arrSelectedTags = this.refs.DrillDownAlias.value.toString().split('_');
        var filterCriteria = [
            // { Field: "Tag_Experience", Values: arrSelectedTags[0] },
            { Field: "Tag_Topic", Values: arrSelectedTags[0] },
            { Field: "Tag_When", Values: arrSelectedTags[1] },
            { Field: "Tag_CourseType", Values: arrSelectedTags[2] },
            { Field: "Tag_AgeRange", Values: arrSelectedTags[3] },
            { Field: "Tag_Duration", Values: arrSelectedTags[4] },
            { Field: "Tag_LanguageOfInstruction", Values: arrSelectedTags[5] },
            { Field: "Tag_LanguageLearned", Values: arrSelectedTags[6] },
            { Field: "Tag_Platform", Values: arrSelectedTags[7] },
            { Field: "Tag_Continent", Values: arrSelectedTags[8] },
            { Field: "Tag_Country", Values: arrSelectedTags[9] },
            { Field: "Tag_State", Values: arrSelectedTags[10] },
            { Field: "Tag_City", Values: arrSelectedTags[11] },
            { Field: "Tag_Feature", Values: arrSelectedTags[12] }
        ];

        if (filterCriteria.filter(m => m.Values === undefined || m.Values === '').length > 0) {
            this.isDrillDownTagValid = false;
        }
        else {
            this.isDrillDownTagValid = true;
        }

        this.setState({ showDrillDownAliasPreview: true });
    }

    onBlur() {
        $('.card').attr('id', '');
    }

    getSelectedValue = (value) => {
        //alert('sdads')
        console.log(this.newLinkingPageURL.length);
        if (this.getCustomizedLinksData.filter(m => m.PageUrl === value).length === 0 &&
            this.props.UniqueContentData.filter(m => m.PageUrl === value).length !== 0) {
            this.setState({ isPgUrl: true });
            this.newLinkingPageURL = this.props.UniqueContentData.filter(m => m.PageUrl === value).map(m => { return { UniqueContent_ID: m.UniqueContent_ID, PageUrl: m.PageUrl, PageTitle: m.PageTitle, BannerImage: '', LabelTag: '' } });
            console.log(this.newLinkingPageURL);
        }
        else {
            this.setState({ isPgUrl: false });
            // this.newLinkingPageURL.length > 0 
            // ? this.newLinkingPageURL = {UniqueContent_ID: null, PageUrl: value, PageTitle: this.refs.AnchorText.value, BannerImage: '', LabelTag: '' }
            this.newLinkingPageURL = [{ UniqueContent_ID: null, PageUrl: value, PageTitle: this.refs.AnchorText.value, BannerImage: '', LabelTag: '' }];
            console.log(this.newLinkingPageURL);
        }
    }

    getCustomizedLinks() {
        console.log(this.props.setDrillDownData['UniqueContent_ID'])
        $.ajax({
            url: 'http://ctdev.ef.com:3000/getCustomizedLinks/?UniqueContent_ID=' + this.props.setDrillDownData['UniqueContent_ID'],
            type: 'GET',
            cache: false,
            success: function (data) {
                this.getCustomizedLinksData = data;
                console.log(data);
                this.getFeatureTag3Results = data.filter(m => m.Type === false);
                this.getCustomizedFeatureTagResults = data.filter(m => m.Type === true);
                console.log(this.getFeatureTag3Results)

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

    ShowfeatureTag3() {
        if ($('#featureTag3Preview').text() === 'Show Pages') {
            this.setState({ showFeatureTag3Pages: true });
            $('#featureTag3Preview').text('Hide Pages');
        }
        else {
            $('#featureTag3Preview').text('Show Pages');
            this.newLinkingPageURL = {};
            this.setState({ showFeatureTag3Pages: false });
        }
    }

    RemoveLinkingPage = (value) => {
        this.getCustomizedFeatureTagResults = this.getCustomizedFeatureTagResults.filter(m => m.PageUrl !== value['PageUrl']);
        this.objDrillDown.CustomizedLinksData = '<CustomizedLinks>' + this.getCustomizedFeatureTagResults.map(m => { return '<LinkingPages Id="' + m.UniqueContent_ID + '"/>' }).toString().replace(/,/g, ' ') + '</CustomizedLinks>';
        this.props.getDrillDownData(this.objDrillDown);
        this.setState({ showCustomizedTags: true });
    }

    AddLinkingPage() {
        if (this.newLinkingPageURL.length !== undefined) {
            this.getCustomizedFeatureTagResults.push(this.newLinkingPageURL[0]);
            this.objDrillDown.CustomizedLinksData = '<CustomizedLinks>' + this.getCustomizedFeatureTagResults.map(m => { return '<LinkingPages Id="' + m.UniqueContent_ID + '"/>' }).toString().replace(/,/g, ' ') + '</CustomizedLinks>';
            this.props.getDrillDownData(this.objDrillDown);
            this.setState({ showCustomizedTags: true });
        }
    }

    AddFeatureTag3Links(){
        if (this.newLinkingPageURL.length !== undefined) {
            var PageUrl = this.newLinkingPageURL.map(m => {return m.PageUrl}).toString();
            if(this.getFeatureTag3Results.filter(m => m.PageUrl === PageUrl).length ===0){
                this.getFeatureTag3Results.push(this.newLinkingPageURL[0]);
                this.objDrillDown.CustomizedLinksData = '<CustomizedLinks>' + this.getFeatureTag3Results.map(m => { return '<LinkingPages Id="' + m.UniqueContent_ID + '"/>' }).toString().replace(/,/g, ' ') + '</CustomizedLinks>';
                this.props.getDrillDownData(this.objDrillDown);
                this.setState({ showFeatureTag3Pages: true });
            }
        }
    }

    RemoveFeatureTag3Links(value){
        this.getFeatureTag3Results = this.getFeatureTag3Results.filter(m => m.PageUrl !== value['PageUrl']);
        this.objDrillDown.CustomizedLinksData = '<CustomizedLinks>' + this.getFeatureTag3Results.map(m => { return '<LinkingPages Id="' + m.UniqueContent_ID + '"/>' }).toString().replace(/,/g, ' ') + '</CustomizedLinks>';
        this.props.getDrillDownData(this.objDrillDown);
        this.setState({ showFeatureTag3Pages: true });
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
                                    {!this.isTag1Valid ? <div class="alert alert-danger" role="alert">
                                                                Invalid tag!
                                                                </div> :this.state.showTag1Preview ?
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
                                {!this.isTag2Valid ? <div class="alert alert-danger" role="alert">
                                                                Invalid tag!
                                                                </div> :this.state.showTag2Preview ?
                                        <Preview UniqueContentData={this.props.UniqueContentData} setData={this.objDrillDown.FeaturePageTag2 === undefined ? this.props.setDrillDownData['FeaturePageTag2'] : this.objDrillDown.FeaturePageTag2} /> : ''}
                                </div>
                            </div>
                        </div>
                        <br />

                        {/* Feature Tag 3 */}
                        <strong> Feature Tag 3: </strong>
                        <br />
                        <button id="featureTag3Preview" class="btn btn-primary btn-sm" type="submit" onClick={this.ShowfeatureTag3.bind(this)}>Show Pages</button>
                        <br />
                        {this.state.showFeatureTag3Pages
                            ? <div> <LinkingPagesPreview setLinkingPageData={this.getFeatureTag3Results} DeleteRow={this.RemoveFeatureTag3Links.bind(this)} /> <br />
                                <div class="input-group input-group-sm" >
                                    <TextBox PageUrl={this.props.UniqueContentData.filter(m => m.IsActive).map(m => { return { name: m.PageUrl } })} selectedValue={this.getSelectedValue.bind(this)} />
                                    <input type="text" ref="AnchorText" placeholder="Anchor text" />
                                    <button class="btn btn-primary btn-sm" type="submit" onClick={this.AddFeatureTag3Links.bind(this)}>Add linking page </button>
                                </div> 
                                </div> 
                                : ''}

                        <br />

                        {/* Feature Tag Customized */}
                        <strong> Feature Tag Customized: </strong>
                        <br />
                        <button id="customizedTagsPreview" class="btn btn-primary btn-sm" type="submit" onClick={this.ShowCustomizedTags.bind(this)}>Show Customized Tags</button>
                        <br />
                        {this.state.showCustomizedTags
                            ? <div> <LinkingPagesPreview setLinkingPageData={this.getCustomizedFeatureTagResults} DeleteRow={this.RemoveLinkingPage.bind(this)} /> <br />
                                <div class="input-group input-group-sm" >
                                    <TextBox PageUrl={this.props.UniqueContentData.filter(m => m.IsActive).map(m => { return { name: m.PageUrl } })} selectedValue={this.getSelectedValue.bind(this)} />
                                    <button class="btn btn-primary btn-sm" type="submit" onClick={this.AddLinkingPage.bind(this)}>Add linking page </button>
                                </div> </div> : ''}

                        <br />
                        {/* Drill Down Alias Content */}
                        <strong> Drill Down Alias: </strong>
                        <br />
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control input-sm" id="txtDrillDownAlias" defaultValue={this.props.setDrillDownData['DrillDownAlias']} ref="DrillDownAlias" onChange={this.onChange.bind(this)} />
                                    <span class="input-group-btn">
                                        <button id="DrillDownAliasPreview" data-toggle="collapse" data-target="#collapseDrillDownAlias" aria-expanded="true" aria-controls="collapseDrillDownAlias" class="btn btn-primary btn-sm" type="submit" onBlur={this.onBlur} onClick={this.DrillDownAliasPreviewOnClick.bind(this)} >Preview</button>
                                    </span>
                                </div>
                                <div id="collapseDrillDownAlias" class="collapse" aria-labelledby="DrillDown" data-parent="DrillDownAliasButton">
                                    {!this.isDrillDownTagValid ? <div class="alert alert-danger" role="alert">
                                                                Invalid tag!
                                                                </div> : this.state.showDrillDownAliasPreview ?
                                            <Preview UniqueContentData={this.props.UniqueContentData} setData={this.objDrillDown.DrillDownAlias === undefined ? this.props.setDrillDownData['DrillDownAlias'] : this.objDrillDown.DrillDownAlias} /> : ''}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default DrillDown;
