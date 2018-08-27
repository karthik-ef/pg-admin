import React, { Component } from 'react';
import $ from 'jquery';
import '../Dashboard/Dashboard.css'
import ExpandIcon from './Plus.png';
import ShrinkIcon from './Minus.png';
import SearchByTag from '../SearchResult/SearchByTag';
import RichTextEditor from '../CustomRichTextEditor';


import PageTagSection from '../PageEditor/PageTagSection';
import MetaInformation from '../PageEditor/MetaInformation';
import BannerImage from '../PageEditor/BannerImage';


const ParentPageID = 0;
const EditPage = [];
var ParentPageUrl = '';
const UniqueContentData = [];
const isFamilyTreeVisible = false;
var FamilyTreeHierarchy = [];

var VisibleIntroText = '';
var HiddenIntroText = '';
var ContentText1 = '';
var ContentText2 = '';
var UpdatedUniqueContentData = {}

var isParentPageUrlModified = false;

// New Structure
var objMetaInformation = {}
var objBannerImage = {}

var isMetaInformationModified = false;
this.isBannerImageModified = false;



class EditContent extends Component {

    constructor() {
        super();
        this.ParentPageID = 0;
        this.ParentPageUrl = '';
        this.EditPage = [];
        this.UniqueContentData = [];
        this.FamilyTreeHierarchy = [];
        this.isParentPageUrlModified = false;
        this.active = false;
        this.UpdatedUniqueContentData = {};



        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.ShowFamilyTree = this.ShowFamilyTree.bind(this);
        this.getFamilyTreeHierarchy = this.getFamilyTreeHierarchy.bind(this);
        this.IsActiveChanged = this.IsActiveChanged.bind(this);
        this.SavetoDb = this.SavetoDb.bind(this);

        this.state = {
            collapseIcon: ExpandIcon,
            isClosed: false,
            ParentPageID: 0,
            FeatureTagType: '',
            updatedTagSectionData: [],
            isTagSectionModified: false,
            isUpdated: false,
            isActive: false
        }
    }


    componentDidMount() {

        this.isFamilyTreeVisible = false;
        this.EditPage = this.props.EditPageRow !== undefined ? this.props.EditPageRow['EditRowData'] : [];
        this.UniqueContentData = this.props.EditPageRow !== undefined ? this.props.EditPageRow['UniqueContentData'] : [];
        this.setState({ ParentPageID: 0, isActive: this.EditPage['IsActive'] });


        $('#exampleModalLong').modal('show');
        $('.card').on('shown.bs.collapse', function () {
            $(this).find('img').attr("src", ShrinkIcon)
        });

        $('.card').on('hidden.bs.collapse', function () {
            $(this).find('img').attr("src", ExpandIcon)
        });
    }

    handleCloseClick() {
        this.setState({ isClosed: true });
    }

    BannerImageTextChange(e) {
        alert(e.target.value);
    }

    ShowFamilyTree() {
        this.isParentPageUrlModified = true;
        this.FamilyTreeHierarchy = [];
        this.ParentPageUrl = this.refs.ParentPageUrl.value;
        this.ParentPageID = Number(this.UniqueContentData.filter(m => m.PageUrl === this.ParentPageUrl).map(m => m.ParentPageID));
        this.getFamilyTreeHierarchy(this.ParentPageID);
        this.setState({ isFamilyTreeVisible: true });
    }

    getFamilyTreeHierarchy(ParentPageID) {
        let filteredContentData = this.UniqueContentData.filter(m => m.UniqueContent_ID === Number(ParentPageID));
        if (filteredContentData.length > 0) {
            this.FamilyTreeHierarchy.push(filteredContentData.map(m => {
                return <li class="breadcrumb-item"><a href="#">{m.PageUrl}</a></li>
            }))
            this.getFamilyTreeHierarchy(filteredContentData.map(m => m.ParentPageID));
        }
    }

    // getSearchByTagValues = (values) => {
    //     this.setState({ updatedTagSectionData: values, isTagSectionModified: true });
    //     // this.props.SearchByTagValues(values)
    //     console.log(values);
    // }

    getRichTextValue = (component, value) => {
        if (component === 'VisibleIntroText') {
            this.VisibleIntroText = value;
        }
        else if (component === 'HiddenIntroText') {
            this.HiddenIntroText = value;
        }
        else if (component === 'ContentText1') {
            this.ContentText1 = value;
        }
        else if (component === 'ContentText2') {
            this.ContentText2 = value;
        }
    }

    CustomizedTag(e, a) {
        this.setState({ FeatureTagType: e })
        $('#exampleModalLong').modal('hide');
        $('#anotherModal').modal('show');
    }
    test() {
        $('#exampleModalLong').modal('show');
    }

    AddLinkingPage() {

    }

    Save() {

    }

    SavetoDb() {


        // console.log(this.objMetaInformation);
        this.UpdatedUniqueContentData.UniqueContent_ID = this.EditPage['UniqueContent_ID'];
        this.UpdatedUniqueContentData.MarketCode = this.EditPage['MarketCode'];
        this.UpdatedUniqueContentData.PageURL = this.EditPage['PageUrl'];

        this.UpdatedUniqueContentData.TagExperience = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_Experience').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_Experience'];

        this.UpdatedUniqueContentData.TagKeywordTopic = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_KeywordTopic').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_KeywordTopic'];

        this.UpdatedUniqueContentData.TagWhen = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_When').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_When'];

        this.UpdatedUniqueContentData.TagCourseType = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_CourseType').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_CourseType'];

        this.UpdatedUniqueContentData.TagAgeRange = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_AgeRange').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_AgeRange'];

        this.UpdatedUniqueContentData.TagDuration = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_Duration').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_Duration'];

        this.UpdatedUniqueContentData.TagLocalOffice = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_LocalOffice').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_LocalOffice'];

        this.UpdatedUniqueContentData.TagLanguage = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_Language').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_Language'];

        this.UpdatedUniqueContentData.TagPlatform = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_Platform').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_Platform'];

        this.UpdatedUniqueContentData.TagContinent = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_Continent').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_Continent'];

        this.UpdatedUniqueContentData.TagCountry = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_Country').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_Country'];

        this.UpdatedUniqueContentData.TagState = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_State').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_State'];

        this.UpdatedUniqueContentData.TagCity = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_City').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_City'];

        this.UpdatedUniqueContentData.TagFeature = this.state.isTagSectionModified
            ? this.state.updatedTagSectionData.filter(m => m.Field === 'Tag_Feature').map(m => { return m.Values }).toString()
            : this.EditPage['Tag_Feature'];

        this.UpdatedUniqueContentData.BannerImage = this.isBannerImageModified ? this.objBannerImage['BannerImage'] : this.EditPage['BannerImage'];

        this.UpdatedUniqueContentData.MetaTitle = this.isMetaInformationModified ? this.objMetaInformation['MetaTitle'] : this.EditPage['MetaTitle'];
        this.UpdatedUniqueContentData.MetaDescription = this.isMetaInformationModified ? this.objMetaInformation['MetaDescription'] : this.EditPage['MetaDescription'];
        this.UpdatedUniqueContentData.MetaRobot = this.isMetaInformationModified ? this.objMetaInformation['MetaRobot'] : this.EditPage['MetaRobot'];

        this.UpdatedUniqueContentData.PageTitle = this.refs.PageTitle.value;
        this.UpdatedUniqueContentData.VisibleIntroText = this.VisibleIntroText;
        this.UpdatedUniqueContentData.HiddenIntroText = this.HiddenIntroText;
        this.UpdatedUniqueContentData.SubHeader1 = this.refs.SubHeader1.value;
        this.UpdatedUniqueContentData.SubHeader2 = this.refs.SubHeader2.value;
        this.UpdatedUniqueContentData.ContentText1 = this.ContentText1;
        this.UpdatedUniqueContentData.ContentText2 = this.ContentText2;
        this.UpdatedUniqueContentData.BreadcrumbText = this.refs.BreadcrumbText.value;
        this.UpdatedUniqueContentData.FeaturePageTag1 = this.refs.FeaturePageTag1.value;
        this.UpdatedUniqueContentData.FeaturePageTag2 = this.refs.FeaturePageTag2.value;
        this.UpdatedUniqueContentData.FeaturePageTag3 = '';
        this.UpdatedUniqueContentData.ParentPageID = !this.isParentPageUrlModified ? this.EditPage['ParentPageID'] : this.ParentPageID;
        this.UpdatedUniqueContentData.IsActive = this.state.isActive;
        this.UpdatedUniqueContentData.UserName = JSON.parse(sessionStorage.getItem('Login'))['UserName'];

        //API call to update the record
        this.UpdatedUniqueContent();
    }

    IsActiveChanged() {
        this.setState({ isActive: $('#IsActive').is(':checked') });
    }

    SaveAndPublish() {

    }

    UpdatedUniqueContent() {
        console.log(this.UpdatedUniqueContentData)
        $.ajax({
            url: 'http://localhost:3001/updateUniqueContent',
            type: 'POST',
            dataType: 'TEXT',
            data: this.UpdatedUniqueContentData,
            cache: false,
            success: function (data) {
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    // New Structure

    PageTagSection = (value) => {
        this.setState({ updatedTagSectionData: value, isTagSectionModified: true });
    }

    MetaInformationSection = (value) => {
        this.isMetaInformationModified = true;
        this.objMetaInformation = value;
    }

    BannerImageSection = (value) => {
        this.isBannerImageModified = true;
        this.objBannerImage = value;
    }

    render() {
        const EditPage = this.props.EditPageRow !== undefined ? this.props.EditPageRow['EditRowData'] : [];
        const UniqueContentData = this.props.EditPageRow !== undefined ? this.props.EditPageRow['UniqueContentData'] : [];
        this.props.callbackFromEditContent(this.state.isClosed)
        return (
            <div>
                <div class="modal hide fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <strong> URL: {EditPage['PageUrl'] === undefined ? this.props.PageUrl : EditPage['PageUrl']} </strong>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCloseClick}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="accordion" id="accordionExample">

                                    <PageTagSection data={EditPage} SelectedValue={this.PageTagSection.bind(this)} />


                                    {/* <div class="card">
                                        <div class="card-header" id="headingOne">
                                            <p data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> <strong >
                                                Page Tag section   <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>

                                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <SearchByTag SearchByTagValues={this.getSearchByTagValues} ValueFromDb={EditPage} />
                                            </div>
                                        </div>
                                    </div> */}

                                    <div class="card">
                                        <div class="card-header" id="headingTwo">
                                            <p data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo"> <strong >
                                                Parent Page URL & Family tree   <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>

                                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <strong> Parent Page URL: </strong>
                                                <br />
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="input-group input-group-sm">
                                                            <input type="text" class="form-control input-sm" id="search-church" ref="ParentPageUrl"
                                                                defaultValue={UniqueContentData.filter(m => m.UniqueContent_ID === EditPage['ParentPageID']).map(m => m.PageUrl)} required />
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-primary btn-sm" type="submit" onClick={this.ShowFamilyTree}>Show Family Tree</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br />
                                                {this.state.isFamilyTreeVisible ?
                                                    <div>
                                                        <strong> Family Tree: </strong>
                                                        <nav aria-label="breadcrumb">
                                                            <ol class="breadcrumb">
                                                                {this.FamilyTreeHierarchy.length > 0 ? this.FamilyTreeHierarchy.reverse() : ''}
                                                                {this.FamilyTreeHierarchy.length > 0 ? <li class="breadcrumb-item active" aria-current="page">{this.ParentPageUrl} </li> : 'No Parent'}
                                                            </ol>
                                                        </nav>
                                                    </div>
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>

                                    <MetaInformation data={EditPage} MetaInformation={this.MetaInformationSection.bind(this)} />

                                    {/* <div class="card">
                                        <div class="card-header" id="headingThree">
                                            <p data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree"> <strong >
                                                Meta Information  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>

                                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <strong> Meta Title: </strong>
                                                <br />
                                                <input type="text" class="form-control" defaultValue={EditPage['MetaTitle']} ref="MetaTitle" />
                                                <br />
                                                <strong> Meta Description: </strong>
                                                <textarea class="form-control" rows="5" defaultValue={EditPage['MetaDescription']} ref="MetaDescription"></textarea>
                                                <br />
                                                <strong> Meta Robot: </strong>
                                                <input type="text" class="form-control" readOnly={true} defaultValue={EditPage['MetaRobot']} ref="MetaRobot" />
                                            </div>
                                        </div>
                                    </div> */}

                                    <div class="card">
                                        <div class="card-header" id="headingFour">
                                            <p data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour"> <strong >
                                                Page Content <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>
                                        <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <strong> Page Title: </strong>
                                                <br />
                                                <input type="text" class="form-control" defaultValue={EditPage['PageTitle']} ref="PageTitle" />
                                                <br />
                                                <strong> Visible Intro Text: </strong>
                                                <br />
                                                <RichTextEditor defaultValue={EditPage['VisibleIntroText']} getRichTextEditorValue={this.getRichTextValue.bind(this, 'VisibleIntroText')} />
                                                <br />
                                                <strong> Hidden Intro Text: </strong>
                                                <br />
                                                <RichTextEditor defaultValue={EditPage['HiddenIntroText']} getRichTextEditorValue={this.getRichTextValue.bind(this, 'HiddenIntroText')} />
                                                <br />
                                                <strong> Page Sub Header 1: </strong>
                                                <br />
                                                <input type="text" class="form-control" defaultValue={EditPage['SubHeader1']} ref="SubHeader1" />
                                                <br />
                                                <strong> Page Content Part 1: </strong>
                                                <br />
                                                <RichTextEditor defaultValue={EditPage['ContentText1']} getRichTextEditorValue={this.getRichTextValue.bind(this, 'ContentText1')} />
                                                <br />
                                                <strong> Page Sub Header 2: </strong>
                                                <br />
                                                <input type="text" class="form-control" defaultValue={EditPage['SubHeader2']} ref="SubHeader2" />
                                                <br />
                                                <strong> Page Content Part 2: </strong>
                                                <br />
                                                <RichTextEditor defaultValue={EditPage['ContentText2']} getRichTextEditorValue={this.getRichTextValue.bind(this, 'ContentText2')} />
                                                <br />
                                                <strong> Breadcrumb Text: </strong>
                                                <br />
                                                <input type="text" class="form-control" defaultValue={EditPage['BreadcrumbText']} ref="BreadcrumbText" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingFive">
                                            <p data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive"> <strong >
                                                Drill down  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>
                                        <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <strong> Feature Tag Page 1: </strong>
                                                <br />
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="input-group input-group-sm">
                                                            <input type="text" class="form-control input-sm" id="search-church" defaultValue={EditPage['FeaturePageTag1']} ref="FeaturePageTag1" />
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-primary btn-sm" type="submit" onClick={this.CustomizedTag.bind(this, 'Feature Page Tag 1')}>Preview</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Feature Tag 1 Content */}
                                                <br />
                                                <strong> Feature Tag Page 2: </strong>
                                                <br />
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="input-group input-group-sm">
                                                            <input type="text" class="form-control input-sm" id="search-church" defaultValue={EditPage['FeaturePageTag2']} ref="FeaturePageTag2" />
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-primary btn-sm" type="submit" onClick={this.CustomizedTag.bind(this, 'Feature Page Tag 2')}>Preview</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Feature Tag 2 Content */}
                                                <br />
                                                <strong> Feature Tag Page 3: </strong>
                                                <br />
                                                <button class="btn btn-primary btn-sm" type="submit" onClick={this.CustomizedTag.bind(this, 'Feature Page Tag 3')}>Show Customized Tags</button>
                                            </div>
                                        </div>
                                    </div>

                                    <BannerImage setBannerImageData={EditPage['BannerImage']} getBannerImageData={this.BannerImageSection.bind(this)} />
                                    {/* <div class="card">
                                        <div class="card-header" id="headingSix">
                                            <p data-toggle="collapse" data-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix"> <strong >
                                                Banner Image  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>
                                        <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <strong> Banner Image Path: </strong>
                                                <br />
                                                <input type="text" class="form-control input-sm" defaultValue={EditPage['BannerImage']} ref="BannerImage" />
                                            </div>
                                        </div>
                                    </div> */}
                                    
                                    <div class="card">
                                        <div class="card-header" id="headingSeven">
                                            <div class="form-check form-check-inline">
                                                <label class="form-check-label" for="inlineCheckbox2"><strong>Active</strong></label>
                                                <input type="checkbox" id="activeCheckBox" class="form-check-input" id="IsActive" defaultChecked={EditPage['IsActive']} onChange={this.IsActiveChanged} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary">Cancel</button>
                                <button type="button" class="btn btn-primary">Save and Publish</button>
                                <button type="button" class="btn btn-primary" onClick={this.SavetoDb.bind(this)}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="anotherModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">{this.state.FeatureTagType}</h5>
                                <br />
                                {this.state.FeatureTagType === 'Feature Page Tag 3'
                                    ? EditPage['PageUrl'] === undefined ? this.props.PageUrl : EditPage['PageUrl'] : ''}
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.test}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onClick={this.AddLinkingPage}>Add linking page</button>
                                <button type="button" class="btn btn-primary" onClick={this.SaveAndPublish}>Save and Publish</button>
                                <button type="button" class="btn btn-primary" onClick={this.Save}>Save </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default EditContent;
