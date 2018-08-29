import React, { Component } from 'react';
import ExpandIcon from '../Icons/Plus.png';
import ShrinkIcon from '../Icons/Minus.png';
import $ from 'jquery';

//Import Editor components
import PageTagSection from '../PageEditor/PageTagSection';
import ParentPage from '../PageEditor/ParentPage';
import MetaInformation from '../PageEditor/MetaInformation';
import PageContent from '../PageEditor/PageContent';
import DrillDown from '../PageEditor/DrillDown';
import BannerImage from '../PageEditor/BannerImage';
import PageStatus from '../PageEditor/PageStatus';

//Declaration
let objPageTag, isPageTagModified; //PageTagSection
let objParentPageUrl, isParentPageModified; //ParentPage
let objMetaInformation, isMetaInformationModified; //MetaInformation
let objPageContent, isPageContentModified; //PageContent
let objDrillDown, isDrillDownModified; //DrillDown
let objBannerImage, isBannerImageModified; //BannerImage
let objPageStatus, isPageStatusModified; //PageStatus

let modifiedData = {};

class PageEditor extends Component {

    componentDidMount() {
        $('#pageEditor').modal('show');
        $('.card').on('shown.bs.collapse', function () {
            $(this).find('img').attr("src", ShrinkIcon)
        });

        $('.card').on('hidden.bs.collapse', function () {
            $(this).find('img').attr("src", ExpandIcon)
        });
    }

    // Pass the value to parent component
    modalClosed() {
        this.props.callbackFromEditContent(true);
    }

    //Update the modified data to QA
    UpdateToQA() {
        let EditPage = this.props.EditPageRow !== undefined ? this.props.EditPageRow['EditRowData'] : [];
        modifiedData.UniqueContent_ID = EditPage['UniqueContent_ID'];
        modifiedData.MarketCode = EditPage['MarketCode'];
        modifiedData.PageURL = EditPage['PageUrl'];

        modifiedData.TagExperience = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_Experience').map(m => { return m.Values }).toString()
            : EditPage['Tag_Experience'];

        modifiedData.TagKeywordTopic = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_KeywordTopic').map(m => { return m.Values }).toString()
            : EditPage['Tag_KeywordTopic'];

        modifiedData.TagWhen = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_When').map(m => { return m.Values }).toString()
            : EditPage['Tag_When'];

        modifiedData.TagCourseType = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_CourseType').map(m => { return m.Values }).toString()
            : EditPage['Tag_CourseType'];

        modifiedData.TagAgeRange = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_AgeRange').map(m => { return m.Values }).toString()
            : EditPage['Tag_AgeRange'];

        modifiedData.TagDuration = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_Duration').map(m => { return m.Values }).toString()
            : EditPage['Tag_Duration'];

        modifiedData.TagLocalOffice = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_LocalOffice').map(m => { return m.Values }).toString()
            : EditPage['Tag_LocalOffice'];

        modifiedData.TagLanguage = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_Language').map(m => { return m.Values }).toString()
            : EditPage['Tag_Language'];

        modifiedData.TagPlatform = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_Platform').map(m => { return m.Values }).toString()
            : EditPage['Tag_Platform'];

        modifiedData.TagContinent = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_Continent').map(m => { return m.Values }).toString()
            : EditPage['Tag_Continent'];

        modifiedData.TagCountry = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_Country').map(m => { return m.Values }).toString()
            : EditPage['Tag_Country'];

        modifiedData.TagState = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_State').map(m => { return m.Values }).toString()
            : EditPage['Tag_State'];

        modifiedData.TagCity = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_City').map(m => { return m.Values }).toString()
            : EditPage['Tag_City'];

        modifiedData.TagFeature = isPageTagModified
            ? objPageTag.filter(m => m.Field === 'Tag_Feature').map(m => { return m.Values }).toString()
            : EditPage['Tag_Feature'];

        modifiedData.BannerImage = isBannerImageModified ? objBannerImage['BannerImage'] : EditPage['BannerImage'];

        modifiedData.MetaTitle = isMetaInformationModified ? objMetaInformation['MetaTitle'] : EditPage['MetaTitle'];
        modifiedData.MetaDescription = isMetaInformationModified ? objMetaInformation['MetaDescription'] : EditPage['MetaDescription'];
        modifiedData.MetaRobot = isMetaInformationModified ? objMetaInformation['MetaRobot'] : EditPage['MetaRobot'];

        modifiedData.PageTitle = isPageContentModified && objPageContent['PageTitle'] !== undefined ? objPageContent['PageTitle'] : EditPage['PageTitle'];
        modifiedData.VisibleIntroText = isPageContentModified && objPageContent['VisibleIntroText'] !== undefined ? objPageContent['VisibleIntroText'] : EditPage['VisibleIntroText'];
        modifiedData.HiddenIntroText = isPageContentModified && objPageContent['HiddenIntroText'] !== undefined ? objPageContent['HiddenIntroText'] : EditPage['HiddenIntroText'];
        modifiedData.SubHeader1 = isPageContentModified && objPageContent['SubHeader1'] !== undefined ? objPageContent['SubHeader1'] : EditPage['SubHeader1'];
        modifiedData.SubHeader2 = isPageContentModified && objPageContent['SubHeader2'] !== undefined ? objPageContent['SubHeader2'] : EditPage['SubHeader2'];
        modifiedData.ContentText1 = isPageContentModified && objPageContent['ContentText1'] !== undefined ? objPageContent['ContentText1'] : EditPage['ContentText1'];
        modifiedData.ContentText2 = isPageContentModified && objPageContent['ContentText2'] !== undefined ? objPageContent['ContentText2'] : EditPage['ContentText2'];
        modifiedData.BreadcrumbText = isPageContentModified && objPageContent['BreadcrumbText'] !== undefined ? objPageContent['BreadcrumbText'] : EditPage['BreadcrumbText'];


        modifiedData.FeaturePageTag1 = isDrillDownModified && objDrillDown['FeaturePageTag1'] !== undefined ? objDrillDown['FeaturePageTag1'] : EditPage['FeaturePageTag1'];
        modifiedData.FeaturePageTag2 = isDrillDownModified && objDrillDown['FeaturePageTag2'] !== undefined ? objDrillDown['FeaturePageTag2'] : EditPage['FeaturePageTag2'];

        modifiedData.ParentPageID = isParentPageModified ? objParentPageUrl : EditPage['ParentPageID'] ;
        modifiedData.IsActive = isPageStatusModified ? objPageStatus : EditPage['IsActive'];
        modifiedData.UserName = JSON.parse(localStorage.getItem('Login'))['UserName'];

        //API call to update the record
        if (EditPage['PageUrl'] === '/test/'){
            this.APICall();
        }
    }

    //Update the modified data to LIVE
    UpdateToLive() {

    }

    APICall() {
        console.log(modifiedData);
        $.ajax({
            url: 'http://ctdev.ef.com:3000/updateUniqueContent',
            type: 'POST',
            dataType: 'TEXT',
            data: modifiedData,
            cache: false,
            success: function (data) {
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    // Call back methods from page section
    PageTagSection = (value) => {
        isPageTagModified = true;
        objPageTag = value;
    }

    ParentPageSection = (value) => {
        isParentPageModified = true;
        objParentPageUrl = value;
    }

    MetaInformationSection = (value) => {
        isMetaInformationModified = true;
        objMetaInformation = value;
    }

    PageContentSection = (value) => {
        isPageContentModified = true;
        objPageContent = value;
    }

    DrillDownSection = (value) => {
        isDrillDownModified = true;
        objDrillDown = value;
    }

    BannerImageSection = (value) => {
        isBannerImageModified = true;
        objBannerImage = value;
    }

    PageStatusSection = (value) => {
        isPageStatusModified = true;
        objPageStatus = value;
    }

    render() {
        const EditPage = this.props.EditPageRow !== undefined ? this.props.EditPageRow['EditRowData'] : [];
        const UniqueContentData = this.props.EditPageRow !== undefined ? this.props.EditPageRow['UniqueContentData'] : [];
        return (
            <div>
                <div class="modal hide fade" id="pageEditor" tabindex="-1" role="dialog" aria-labelledby="pageEditorTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <strong> URL: {EditPage['PageUrl'] === undefined ? this.props.PageUrl : EditPage['PageUrl']} </strong>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.modalClosed.bind(this)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="accordion" id="pageEditorSection">
                                    <PageTagSection data={EditPage} SelectedValue={this.PageTagSection.bind(this)} />
                                    <ParentPage UniqueContentData={UniqueContentData} setParentPageData={EditPage['ParentPageID']} getParentPageData={this.ParentPageSection.bind(this)} />
                                    <MetaInformation data={EditPage} MetaInformation={this.MetaInformationSection.bind(this)} />
                                    <PageContent setPageContentData={EditPage} getPageContentData={this.PageContentSection.bind(this)} />
                                    <DrillDown setDrillDownData={EditPage} getDrillDownData={this.DrillDownSection.bind(this)} />
                                    <BannerImage setBannerImageData={EditPage['BannerImage']} getBannerImageData={this.BannerImageSection.bind(this)} />
                                    <PageStatus setPageStatusData={EditPage['IsActive']} getPageStatusData={this.PageStatusSection.bind(this)} />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary">Cancel</button>
                                <button type="button" class="btn btn-primary" onClick={this.UpdateToLive.bind(this)}>Save and Publish</button>
                                <button type="button" class="btn btn-primary" onClick={this.UpdateToQA.bind(this)}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageEditor;
