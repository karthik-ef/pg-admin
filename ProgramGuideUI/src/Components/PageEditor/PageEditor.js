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

let objCustomizedData;
let modifiedData = {};

class PageEditor extends Component {

    constructor(){
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
        this.Checkduplicate = {};
        this.validation = false;
		
        this.state = {
            showDuplicateErrorForCreate: false,
            //showDuplicateErrorForUpdate: false,
        }
    }

    componentDidMount() {
        $('#pageEditor').modal('show');
        $('.card').on('shown.bs.collapse', function () {
                if($(this).attr('id') !== 'drillDownPreview'){
                    $(this).find('img').attr("src", ShrinkIcon)
                }
        });

        $('.card').on('hidden.bs.collapse', function () {
            if($(this).attr('id') !== 'drillDownHide'){
                $(this).find('img').attr("src", ExpandIcon)
            }
        });
    }

    // Pass the value to parent component
    modalClosed() {
        this.props.callbackFromEditContent('closed');
    }

    //Update the modified data to QA
    UpdateToQA() {
        let EditPage = this.props.EditPageRow !== undefined ? this.props.EditPageRow['EditRowData'] : [];
        if (this.props.isNewPage !== undefined){
            // this.modifiedData.UniqueContent_ID = EditPage['UniqueContent_ID'];
            this.modifiedData.MarketCode = localStorage.getItem('Market');
            this.modifiedData.PageURL = this.props.PageUrl;
            this.modifiedData.IsActive = this.isPageStatusModified ? this.objPageStatus : false;
            this.modifiedData.ParentPageID = this.isParentPageModified ? this.objParentPageUrl : 0 ;
        }
        else{
            this.modifiedData.UniqueContent_ID = EditPage['UniqueContent_ID'];
            this.modifiedData.MarketCode = EditPage['MarketCode'];
            this.modifiedData.PageURL = EditPage['PageUrl'];
            this.modifiedData.IsActive = this.isPageStatusModified ? this.objPageStatus : EditPage['IsActive'];
            this.modifiedData.ParentPageID = this.isParentPageModified ? this.objParentPageUrl : EditPage['ParentPageID'] ;
        }

        // this.modifiedData.TagExperience = this.isPageTagModified
        //     ? this.objPageTag.filter(m => m.Field === 'Tag_Experience').map(m => { return m.Values }).toString()
        //     : EditPage['Tag_Experience'];

            this.modifiedData.TagKeywordTopic = this.isPageTagModified
            ? this.objPageTag.filter(m => m.Field === 'Tag_Topic').map(m => { return m.Values }).toString()
            : EditPage['Tag_Topic'];

            this.modifiedData.TagWhen = this.isPageTagModified
            ? this.objPageTag.filter(m => m.Field === 'Tag_When').map(m => { return m.Values }).toString()
            : EditPage['Tag_When'];

            this.modifiedData.TagCourseType = this.isPageTagModified
            ? this.objPageTag.filter(m => m.Field === 'Tag_CourseType').map(m => { return m.Values }).toString()
            : EditPage['Tag_CourseType'];

            this.modifiedData.TagAgeRange = this.isPageTagModified
            ? this.objPageTag.filter(m => m.Field === 'Tag_AgeRange').map(m => { return m.Values }).toString()
            : EditPage['Tag_AgeRange'];

            this.modifiedData.TagDuration = this.isPageTagModified
            ?this.objPageTag.filter(m => m.Field === 'Tag_Duration').map(m => { return m.Values }).toString()
            : EditPage['Tag_Duration'];

            this.modifiedData.TagDurationAdditionalDetails = this.isPageTagModified
            ?this.objPageTag.filter(m => m.Field === 'AdditionalDetails').map(m => { return m.Values }).toString()
            : EditPage['FeaturePageTag3'];

            this.modifiedData.TagLocalOffice = this.isPageTagModified
            ? this.objPageTag.filter(m => m.Field === 'Tag_LanguageOfInstruction').map(m => { return m.Values }).toString()
            : EditPage['Tag_LanguageOfInstruction'];

            this.modifiedData.TagLanguage = this.isPageTagModified
            ? this.objPageTag.filter(m => m.Field === 'Tag_LanguageLearned').map(m => { return m.Values }).toString()
            : EditPage['Tag_LanguageLearned'];

            this.modifiedData.TagPlatform = this.isPageTagModified
            ? this.objPageTag.filter(m => m.Field === 'Tag_Platform').map(m => { return m.Values }).toString()
            : EditPage['Tag_Platform'];

            this.modifiedData.TagContinent = this.isPageTagModified
            ? this.objPageTag.filter(m => m.Field === 'Tag_Continent').map(m => { return m.Values }).toString()
            : EditPage['Tag_Continent'];

            this.modifiedData.TagCountry = this.isPageTagModified
            ? this.objPageTag.filter(m => m.Field === 'Tag_Country').map(m => { return m.Values }).toString()
            : EditPage['Tag_Country'];

            this.modifiedData.TagState = this.isPageTagModified
            ? this.objPageTag.filter(m => m.Field === 'Tag_State').map(m => { return m.Values }).toString()
            : EditPage['Tag_State'];

            this.modifiedData.TagCity = this.isPageTagModified
            ? this.objPageTag.filter(m => m.Field === 'Tag_City').map(m => { return m.Values }).toString()
            : EditPage['Tag_City'];

            this.modifiedData.TagFeature = this.isPageTagModified
            ? this.objPageTag.filter(m => m.Field === 'Tag_Feature').map(m => { return m.Values }).toString()
            : EditPage['Tag_Feature'];

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

            this.modifiedData.UserName = JSON.parse(localStorage.getItem('Login'))['UserName'];

        //API call to update the record
        // if (EditPage['PageUrl'] === '/test/'){
        //     this.APICall();
        // }

        var tagStructure = {};
        if(this.isPageTagModified){
            tagStructure = 
            // this.objPageTag.filter(m => m.Field === 'Tag_Experience').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_Topic').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_When').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_CourseType').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_AgeRange').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_Duration').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_LanguageOfInstruction').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_LanguageLearned').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_Platform').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_Continent').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_Country').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_State').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_City').map(m => { return m.Values }).toString() + '_' + 
            this.objPageTag.filter(m => m.Field === 'Tag_Feature').map(m => { return m.Values }).toString()

        }
        
        if( this.Checkduplicate.filter(m => m.Tags === tagStructure).length > 0 )
        {
            this.validation = true;
            this.setState({ showDuplicateErrorForCreate: true});
          
        }
        else if (this.props.isNewPage !== undefined){
            this.setState({ showDuplicateErrorForCreate: false})
            this.CreateNewContent();
        }
        else if(EditPage['PageUrl'] === '/testkarthik1029/'){
            this.APICall();
        }

        if(this.objDrillDown['CustomizedLinksData'] !== undefined){
            this.objCustomizedData.UniqueContent_ID = EditPage['UniqueContent_ID'];
            this.objCustomizedData.LinkPageXml = '<CustomizedLinks>' + this.objDrillDown['CustomizedLinksData'] + this.objDrillDown['CustomizedLinksData1'] + '</CustomizedLinks>';
            
            console.log(this.objCustomizedData.LinkPageXml)
            this.SaveCustomizedTags()
        }
        if(!this.validation)
        {
            $('#pageEditor').modal('hide');
            this.props.callbackFromEditContent(true);
        }
    }

    //Update the modified data to LIVE
    UpdateToLive() {

    }
    CreateNewContent(){
        console.log(this.modifiedData)
        $.ajax({
            url: 'http://ctdev.ef.com:3000/CreateNewContent',
            type: 'POST',
            dataType: 'TEXT',
            data: this.modifiedData,
            cache: false,
            success: function (data) {
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    APICall() {
        console.log(this.modifiedData);
        $.ajax({
            url: 'http://ctdev.ef.com:3000/updateUniqueContent',
            type: 'POST',
            dataType: 'TEXT',
            data: this.modifiedData,
            cache: false,
            success: function (data) {
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    SaveCustomizedTags() {
        $.ajax({
            url: 'http://ctdev.ef.com:3000/SaveCustomizedLinks',
            type: 'POST',
            dataType: 'TEXT',
            data: this.objCustomizedData,
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

    Close(){
        $('#pageEditor').modal('hide');
        this.props.callbackFromEditContent(true);  
    }

    render() {
        const EditPage = this.props.EditPageRow !== undefined ? this.props.EditPageRow['EditRowData'] : [];
        const UniqueContentData = this.props.EditPageRow !== undefined ? this.props.EditPageRow['UniqueContentData'] : this.props.uniqueResult;
        this.Checkduplicate = UniqueContentData;
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
                                    <DrillDown setDrillDownData={EditPage} getDrillDownData={this.DrillDownSection.bind(this)} UniqueContentData={UniqueContentData}/>
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
                                <button type="button" class="btn btn-primary" onClick={this.Close.bind(this)}>Cancel</button>
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
