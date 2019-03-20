import React, { Component } from 'react';
import Up from './UpIcon.png';
import Down from './DownIcon.png';
import $ from 'jquery';
import * as API from '../../api/ContentEditor';

//Import Editor components
import PageTagSection from '../PageEditor/PageTagSection';
import ParentPage from '../PageEditor/ParentPage';
import MetaInformation from '../PageEditor/MetaInformation';
import PageContent from '../PageEditor/PageContent';
import DrillDown from '../PageEditor/DrillDown';
import BannerImage from '../PageEditor/BannerImage';
import PageStatus from '../PageEditor/PageStatus';
import './PageEditor.css';
import { connect } from 'react-redux';

class PageEditor extends Component {

    constructor() {
        super();
        this.modifiedData = {};
        this.objPageTag = {};
        this.objParentPageUrl = {};
        this.objMetaInformation = {};
        this.objPageContent = {};
        this.objDrillDown = {};
        this.objBannerImage = {};
        this.objPageStatus = {};
        this.isPageTagModified = false;
        this.isParentPageModified = false;
        this.isMetaInformationModified = false;
        this.isPageContentModified = false;
        this.isDrillDownModified = false;
        this.isBannerImageModified = false;
        this.isPageStatusModified = false;
        this.objCustomizedData = {};
        this.objDrillDownAlias = {}
        this.Checkduplicate = {};
        this.validation = false;

        this.state = {
            showDuplicateErrorForCreate: false,
            //showDuplicateErrorForUpdate: false,
        }
    }

    componentDidMount() {

        API.getMaxOfUniqueContentId.call(this);
        $('#pageEditor').modal('show');
        $('.card').on('shown.bs.collapse', function () {
            if ($(this).attr('id') !== 'drillDownPreview') {
                $(this).find('img').attr("src", Up)
            }
        });

        $('.card').on('hidden.bs.collapse', function () {
            if ($(this).attr('id') !== 'drillDownHide') {
                $(this).find('img').attr("src", Down)
            }
        });
    }

    // Pass the value to parent component
    modalClosed() {
        this.props.getEditorContentData('closed');
    }

    //Update the modified data to QA
    UpdateToQA() {
        let EditPage = this.props.EditPageRow !== undefined ? this.props.EditPageRow['EditRowData'] : [];
        if (this.props.isNewPage !== undefined) {
            this.modifiedData.UniqueContent_ID = this.maxOfUniqueContentId + 1;
            this.modifiedData.MarketCode = this.props.storeData._selectedMarket;
            this.modifiedData.PageURL = this.props.PageUrl;
            this.modifiedData.IsActive = this.isPageStatusModified ? this.objPageStatus : false;
            this.modifiedData.ParentPageID = this.isParentPageModified ? this.objParentPageUrl : 0;
        }
        else {
            this.modifiedData.UniqueContent_ID = EditPage['UniqueContent_ID'];
            this.modifiedData.MarketCode = EditPage['MarketCode'];
            this.modifiedData.PageURL = EditPage['PageUrl'];
            this.modifiedData.IsActive = this.isPageStatusModified ? this.objPageStatus : EditPage['IsActive'];
            this.modifiedData.ParentPageID = this.isParentPageModified ? this.objParentPageUrl : EditPage['ParentPageID'];
        }

        var arr = this.objPageTag.toString().split('_')

        this.modifiedData.TagKeywordTopic = this.isPageTagModified && arr.length === 14 ? arr[0] : EditPage['Tag_Topic'];

        this.modifiedData.TagWhen = this.isPageTagModified && arr.length === 14 ? arr[1] : EditPage['Tag_When'];

        this.modifiedData.TagCourseType = this.isPageTagModified && arr.length === 14 ? arr[2] : EditPage['Tag_CourseType'];

        this.modifiedData.TagAgeRange = this.isPageTagModified && arr.length === 14 ? arr[3] : EditPage['Tag_AgeRange'];

        this.modifiedData.TagDuration = this.isPageTagModified && arr.length === 14 ? arr[4] : EditPage['Tag_Duration'];

        this.modifiedData.TagLocalOffice = this.isPageTagModified && arr.length === 14 ? arr[5] : EditPage['Tag_LanguageOfInstruction'];

        this.modifiedData.TagLanguage = this.isPageTagModified && arr.length === 14 ? arr[6] : EditPage['Tag_LanguageLearned'];

        this.modifiedData.TagPlatform = this.isPageTagModified && arr.length === 14 ? arr[7] : EditPage['Tag_Platform'];

        this.modifiedData.TagContinent = this.isPageTagModified && arr.length === 14 ? arr[8] : EditPage['Tag_Continent'];

        this.modifiedData.TagCountry = this.isPageTagModified && arr.length === 14 ? arr[9] : EditPage['Tag_Country'];

        this.modifiedData.TagState = this.isPageTagModified && arr.length === 14 ? arr[10] : EditPage['Tag_State'];

        this.modifiedData.TagCity = this.isPageTagModified && arr.length === 14 ? arr[11] : EditPage['Tag_City'];

        this.modifiedData.TagFeature = this.isPageTagModified && arr.length === 14 ? arr[12] : EditPage['Tag_Feature'];

        this.modifiedData.TagDurationAdditionalDetails = this.isPageTagModified && arr.length === 14 ? arr[13] : EditPage['AdditionalDurationDetails'];

        this.modifiedData.BannerImage = this.isBannerImageModified ? this.objBannerImage['BannerImage'] : EditPage['BannerImage'];

        this.modifiedData.MetaTitle = this.isMetaInformationModified ? this.objMetaInformation['MetaTitle'] : EditPage['MetaTitle'];
        this.modifiedData.MetaDescription = this.isMetaInformationModified ? this.objMetaInformation['MetaDescription'] : EditPage['MetaDescription'];
        this.modifiedData.MetaRobot = this.isMetaInformationModified ? this.objMetaInformation['MetaRobot'] : EditPage['MetaRobot'];

        this.modifiedData.PageTitle = this.isPageContentModified && this.objPageContent['PageTitle'] !== undefined ? this.objPageContent['PageTitle'] : EditPage['PageTitle'];
        this.modifiedData.VisibleIntroText = this.isPageContentModified && this.objPageContent['VisibleIntroText'] !== undefined ? this.objPageContent['VisibleIntroText'] : EditPage['VisibleIntroText'];
        this.modifiedData.HiddenIntroText = this.isPageContentModified && this.objPageContent['HiddenIntroText'] !== undefined ? this.objPageContent['HiddenIntroText'] : EditPage['HiddenIntroText'];
        this.modifiedData.SubHeader1 = this.isPageContentModified && this.objPageContent['SubHeader1'] !== undefined ? this.objPageContent['SubHeader1'] : EditPage['SubHeader1'];
        this.modifiedData.SubHeader2 = this.isPageContentModified && this.objPageContent['SubHeader2'] !== undefined ? this.objPageContent['SubHeader2'] : EditPage['SubHeader2'];
        this.modifiedData.ContentText1 = this.isPageContentModified && this.objPageContent['ContentText1'] !== undefined ? this.objPageContent['ContentText1'] : EditPage['ContentText1'];
        this.modifiedData.ContentText2 = this.isPageContentModified && this.objPageContent['ContentText2'] !== undefined ? this.objPageContent['ContentText2'] : EditPage['ContentText2'];
        this.modifiedData.BreadcrumbText = this.isPageContentModified && this.objPageContent['BreadcrumbText'] !== undefined ? this.objPageContent['BreadcrumbText'] : EditPage['BreadcrumbText'];


        this.modifiedData.FeaturePageTag1 = this.isDrillDownModified && this.objDrillDown['FeaturePageTag1'] !== undefined ? this.objDrillDown['FeaturePageTag1'] : EditPage['FeaturePageTag1'];
        this.modifiedData.FeaturePageTag2 = this.isDrillDownModified && this.objDrillDown['FeaturePageTag2'] !== undefined ? this.objDrillDown['FeaturePageTag2'] : EditPage['FeaturePageTag2'];

        this.modifiedData.UserName = this.props.storeData._loginDetails.userName;

        var tagStructure = {};
        if (this.isPageTagModified) {
            tagStructure = this.objPageTag.toString();
        }

        if (this.Checkduplicate.filter(m => m.Tags === tagStructure).length > 0) {
            this.validation = true;
            this.setState({ showDuplicateErrorForCreate: true });

        }
        else if (this.props.isNewPage !== undefined) {
            this.setState({ showDuplicateErrorForCreate: false })
            API.createNewPage.call(this);
        }
        else {
            API.updateUniqueContent.call(this);
        }

        if (this.objDrillDown['DrillDownAlias'] !== undefined) {
            this.objDrillDownAlias.UniqueContent_ID = EditPage['UniqueContent_ID'] ? EditPage['UniqueContent_ID'] : this.maxOfUniqueContentId + 1;
            this.objDrillDownAlias.DrilldownAliasXml = this.objDrillDown['DrillDownAlias'];


            API.saveDrilldownAliasTagsDetails.call(this);
        }

        if (this.objDrillDown['CustomizedLinksData'] !== undefined) {
            this.objCustomizedData.UniqueContent_ID = EditPage['UniqueContent_ID'] ? EditPage['UniqueContent_ID'] : this.maxOfUniqueContentId + 1;
            this.objCustomizedData.LinkPageXml = '<CustomizedLinks>' + this.objDrillDown['CustomizedLinksData'] + '</CustomizedLinks>';
            API.saveCustomizedLinksDetails.call(this);
        }
        if (!this.validation) {
            $('#pageEditor').modal('hide');
            this.props.getEditorContentData('Data updated');
        }
    }

    // Call back methods from page section
    PageTagSection = (value) => {
        this.isPageTagModified = true;
        this.objPageTag = value;
    }

    ParentPageSection = (value) => {
        this.isParentPageModified = true;
        this.objParentPageUrl = value;
    }

    MetaInformationSection = (value) => {
        this.isMetaInformationModified = true;
        this.objMetaInformation = value;
    }

    PageContentSection = (value) => {
        this.isPageContentModified = true;
        this.objPageContent = value;
    }

    DrillDownSection = (value) => {
        this.isDrillDownModified = true;
        this.objDrillDown = value;
    }

    BannerImageSection = (value) => {
        this.isBannerImageModified = true;
        this.objBannerImage = value;
    }

    PageStatusSection = (value) => {
        this.isPageStatusModified = true;
        this.objPageStatus = value;
    }

    Close() {
        $('#pageEditor').modal('hide');
        this.props.getEditorContentData('closed');
    }

    render() {
        const EditPage = this.props.EditPageRow !== undefined ? this.props.EditPageRow['EditRowData'] : [];
        const UniqueContentData = this.props.EditPageRow !== undefined ? this.props.EditPageRow['UniqueContentData'] : this.props.uniqueResult;
        this.Checkduplicate = UniqueContentData;
        return (
            <div>
                <div class="modal hide fade editor__modal" id="pageEditor" tabindex="-1" role="dialog" aria-labelledby="pageEditorTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.modalClosed.bind(this)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="body-title">
                                    <strong> URL: {EditPage['PageUrl'] === undefined ? this.props.PageUrl : EditPage['PageUrl']} </strong>
                                </div>
                                <div class="accordion" id="pageEditorSection">
                                    <PageTagSection data={EditPage} SelectedValue={this.PageTagSection.bind(this)} />
                                    <ParentPage UniqueContentData={UniqueContentData} setParentPageData={EditPage['ParentPageID']} getParentPageData={this.ParentPageSection.bind(this)} />
                                    <MetaInformation data={EditPage} MetaInformation={this.MetaInformationSection.bind(this)} />
                                    <PageContent setPageContentData={EditPage} getPageContentData={this.PageContentSection.bind(this)} />
                                    <DrillDown setDrillDownData={EditPage} getDrillDownData={this.DrillDownSection.bind(this)} UniqueContentData={UniqueContentData.filter(m => m.PageUrl !== EditPage['PageUrl'])} />
                                    <BannerImage setBannerImageData={EditPage['BannerImage']} getBannerImageData={this.BannerImageSection.bind(this)} />
                                    <PageStatus setPageStatusData={EditPage['IsActive']} getPageStatusData={this.PageStatusSection.bind(this)} />
                                </div>
                            </div>
                            <div class="modal-footer">
                                {this.state.showDuplicateErrorForCreate ? <div class="alert alert-danger" role="alert">
                                    This set of tags already exist for other Pagr URL, Please reset the tags.
                                </div> : ''}
                                {/* {this.state.showDuplicateErrorForUpdate ? <div class="alert alert-danger" role="alert">
                                Please modify the data before saving.
                                </div> : ''} */}
                                <button type="button" class="btn btn-modal-default" onClick={this.Close.bind(this)}>Cancel</button>
                                <button type="button" class="btn btn-primary btn-modal" onClick={this.UpdateToQA.bind(this)}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state, props) => { return { storeData: state } })(PageEditor);
