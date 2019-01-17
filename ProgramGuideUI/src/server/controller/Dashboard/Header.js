import React, { Component } from 'react';
import $ from 'jquery';
import Dropdown from '../CustomControls/DropDown';
import FilterCriteria from './FilterCriteria';

import * as modal from '../../server/api_SearchByTag';
import * as genric from '../../utils/generic';
import * as Constant from '../../utils/constant';

//var isTagExperienceChanged = false;
var isTagKeywordTopicChanged = false;
var isTagWhenChanged = false;
var isTagCourseTypeChanged = false;
var isTagAgeRangeChanged = false;
var isTagDurationChanged = false;
var isTagLanguageChanged = false;
var isTagPlatformChanged = false;
var isTagContinentChanged = false;
var isTagCountryChanged = false;
var isTagStateChanged = false;
var isTagCityChanged = false;
var isTagFeatureChanged = false;

class SearchByTag extends Component {
    constructor() {
        super();

        //this.isTagExperienceChanged = false;
        this.isTagKeywordTopicChanged = false
        this.isTagWhenChanged = false;
        this.isTagCourseTypeChanged = false;
        this.isTagAgeRangeChanged = false;
        this.isTagDurationChanged = false;
        this.isTag_LanguageOfInstructionChnaged = false;
        this.isTagLanguageChanged = false;
        this.isTagPlatformChanged = false;
        this.isTagContinentChanged = false;
        this.isTagCountryChanged = false;
        this.isTagStateChanged = false;
        this.isTagCityChanged = false;
        this.isTagFeatureChanged = false;


        this.state = {
           // tagExperienceData: [],
            tagKeywordTopicData: [],
            tagWhenData: [],
            tagCourseTypeData: [],
            tagAgeRangeData: [],
            tagDurationData: [],
            tagLanguageOfInstructionData: [],
            tagLanguageData: [],
            tagPlatformData: [],
            tagContinentData: [],
            tagCountryData: [],
            tagStateData: [],
            tagCityData: [],
            tagFeatureData: [],
           // tagExperienceValue: '',
            tagKeywordTopicValue: '',
            tagWhenValue: '',
            tagCourseTypeValue: '',
            tagAgeRangeValue: '',
            tagDurationValue: '',
            tagLanguageOfInstructionValue: '',
            tagLocaloffice: '',
            tagLanguageValue: '',
            tagPlatformValue: '',
            tagContinentValue: '',
            tagCountryValue: '',
            tagStateValue: '',
            tagCityValue: '',
            tagFeatureValue: '',
            selectedTagValue: []
        }
    }
    // getTagData() {
    //     $.ajax({
    //         url: 'http://ctdev.ef.com:3000/SearchByTag/?MarketCode=' + localStorage.getItem('Market'),
    //         dataType: 'json',
    //         cache: false,
    //         success: function (data) {
    //             console.log(data)
    //            // this.setState({ tagExperienceData: data.filter(m => m.TagName === "Tag_Experience").map(m => { return { label: m.Value, value: m.Value } }) });
    //             this.setState({ tagKeywordTopicData: data.filter(m => m.TagName === "Tag_Topic").map(m => { return { label: m.Value, value: m.Value } }) });
    //             this.setState({ tagWhenData: data.filter(m => m.TagName === "Tag_When").map(m => { return { label: m.Value, value: m.Value } }) });
    //             this.setState({ tagCourseTypeData: data.filter(m => m.TagName === "Tag_CourseType").map(m => { return { label: m.Value, value: m.Value } }) });
    //             this.setState({ tagAgeRangeData: data.filter(m => m.TagName === "Tag_AgeRange").map(m => { return { label: m.Value, value: m.Value } }) });
    //            // this.setState({ tagDurationData: data.filter(m => m.TagName === "Tag_Duration").map(m => { return { label: m.Value, value: m.Value } }) });
    //             this.setState({ tagLanguageOfInstructionData: data.filter(m => m.TagName === "Tag_LanguageOfInstruction").map(m => { return { label: m.Value, value: m.Value } }) });
    //             this.setState({ tagLanguageData: data.filter(m => m.TagName === "Tag_LanguageLearned").map(m => { return { label: m.Value, value: m.Value } }) });
    //             //this.setState({ tagPlatformData: data.filter(m => m.TagName === "Tag_Platform").map(m => { return { label: m.Value, value: m.Value } }) });
    //             this.setState({ tagContinentData: data.filter(m => m.TagName === "Tag_Continent").map(m => { return { label: m.Value, value: m.Value } }) });
    //             this.setState({ tagCountryData: data.filter(m => m.TagName === "Tag_Country").map(m => { return { label: m.Value, value: m.Value } }) });
    //             this.setState({ tagStateData: data.filter(m => m.TagName === "Tag_State").map(m => { return { label: m.Value, value: m.Value } }) });
    //             this.setState({ tagCityData: data.filter(m => m.TagName === "Tag_City").map(m => { return { label: m.Value, value: m.Value } }) });
    //             this.setState({ tagFeatureData: data.filter(m => m.TagName === "Tag_Feature").map(m => { return { label: m.Value, value: m.Value } }) });
    //         }.bind(this),
    //         error: function (xhr, status, err) {
    //             console.log(err);
    //         }
    //     });

    // }

    // getTagDuration(){
    //     $.ajax({
    //         url: 'http://ctdev.ef.com:3000/DurationTags',
    //         dataType: 'json',
    //         cache: false,
    //         success: function (data) {
    //             console.log(data);
    //         this.setState({ tagDurationData: data.map(m => { return { label: m, value: m } }) });
    //         }.bind(this),
    //         error: function (xhr, status, err) {
    //             console.log(err);
    //         }
    //     });
    // }

    // getTagPlatform(){
    //     $.ajax({
    //         url: 'http://ctdev.ef.com:3000/PlatformTags',
    //         dataType: 'json',
    //         cache: false,
    //         success: function (data) {
    //             this.setState({ tagPlatformData: data.map(m => { return { label: m, value: m } }) });
    //         }.bind(this),
    //         error: function (xhr, status, err) {
    //             console.log(err);
    //         }
    //     });
    // }

    componentDidMount() {

        //console.log(genric.dataForDropDown.call(this));
        modal.getDurationTags.call(this);
        modal.getPlatformTags.call(this);
        modal.getRemainingTags.call(this);
        //this.getTagData();
        //this.getTagDuration();
        //this.getTagPlatform();
        $('#exampleModalLong').modal('show');
        // $(window).on('load', function () {
        //     $('#exampleModalLong').modal('show');
        // });
    }

    bindVal(TagName, value) {
        // if (TagName === 'Tag_Experience') {
        //     this.isTagExperienceChanged = true;
        //     this.setState({ tagExperienceValue: value }, function () { this.selectedTags() });
        // }
         if (TagName === 'Tag_Topic') {
            this.isTagKeywordTopicChanged = true;
            this.setState({ tagKeywordTopicValue: value }, function () { this.selectedTags() });
        }
        else if (TagName === 'Tag_When') {
            this.isTagWhenChanged = true;
            this.setState({ tagWhenValue: value }, function () { this.selectedTags() });
        }
        else if (TagName === 'Tag_CourseType') {
            this.isTagCourseTypeChanged = true;
            this.setState({ tagCourseTypeValue: value }, function () { this.selectedTags() });
        }
        else if (TagName === 'Tag_AgeRange') {
            this.isTagAgeRangeChanged = true;
            this.setState({ tagAgeRangeValue: value }, function () { this.selectedTags() });
        }
        else if (TagName === 'Tag_Duration') {
            this.isTagDurationChanged = true;
            this.setState({ tagDurationValue: value }, function () { this.selectedTags() });
        }

        else if (TagName === 'Tag_LanguageOfInstruction') {
            this.isTag_LanguageOfInstructionChnaged = true;
            this.setState({ tagLanguageOfInstructionValue: value }, function () { this.selectedTags() });
        }

        else if (TagName === 'Tag_LanguageLearned') {
            this.isTagLanguageChanged = true;
            this.setState({ tagLanguageValue: value }, function () { this.selectedTags() });
        }
        else if (TagName === 'Tag_Platform') {
            this.isTagPlatformChanged = true;
            this.setState({ tagPlatformValue: value }, function () { this.selectedTags() });
        }
        else if (TagName === 'Tag_Continent') {
            this.isTagContinentChanged = true;
            this.setState({ tagContinentValue: value }, function () { this.selectedTags() });
        }
        else if (TagName === 'Tag_Country') {
            this.isTagCountryChanged = true;
            this.setState({ tagCountryValue: value }, function () { this.selectedTags() });
        }
        else if (TagName === 'Tag_State') {
            this.isTagStateChanged = true;
            this.setState({ tagStateValue: value }, function () { this.selectedTags() });
        }
        else if (TagName === 'Tag_City') {
            this.isTagCityChanged = true;
            this.setState({ tagCityValue: value }, function () { this.selectedTags() });
        }
        else if (TagName === 'Tag_Feature') {
            this.isTagFeatureChanged = true;
            this.setState({ tagFeatureValue: value }, function () { this.selectedTags() });
        }

    }

    selectedTags() {
        var arrSelectedTags = $('#selectedTags').text().split('_');
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
            { Field: "Tag_Feature", Values: arrSelectedTags[12] },
            { Field: "AdditionalDetails", Values : this.refs.AdditionalDetails.value}
        ];

        this.setState({ selectedTagValue: filterCriteria }, function () { this.props.SearchByTagValues(this.state.selectedTagValue) })
    }

// Code refactoring
refreshData(){
    this.forceUpdate()
}

Dyno(){

    var arr = ["Tag_Topic", "Tag_When","Tag_CourseType","Tag_AgeRange","Tag_Duration","Duration details","Tag_LanguageOfInstruction",
    "Tag_LanguageLearned","Tag_Platform","Tag_Continent","Tag_Country","Tag_State","Tag_City","Tag_Feature" ]
    

    arr.forEach(element => {
        {return <div class="col-md-4 ml-auto">
        <div class="col-sm-10">
        <label for="exampleInputEmail1"><strong>Tag_Topic</strong></label>
                            <Dropdown Tags={this.state.tagKeywordTopicData} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_Topic'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_Topic')} />

        </div>
        </div>}
    });
    for(var i= 0; i< 6; i++){
        
    }
}

//

    render() {
        return (
            <div >
                <br />

                <strong>{Constant.SEARCH_TAG_HEADER}</strong>
                <br />
                <br />
                <div class="row">
                    <div class="col-md-4 ml-auto">
                        <div class="col-sm-10">
                        <label for="exampleInputEmail1"><strong>Tag_Topic</strong></label>
                            <Dropdown Tags={this.Tag_Topic } multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_Topic'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_Topic')} />
                        </div>
                    </div>
                    <div class="col-md-5 ml-auto">
                        <div class="col-sm-8">
                        <label for="exampleInputEmail1"><strong>Tag_When</strong></label>
                            <Dropdown Tags={this.Tag_When } multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_When'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_When')} />
                        </div>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-4 ml-auto">
                        <div class="col-sm-10">
                        <label for="exampleInputEmail1"><strong>Tag_CourseType</strong></label>
                            <Dropdown Tags={this.Tag_CourseType} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_CourseType'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_CourseType')} />
                        </div>
                    </div>
                    <div class="col-md-5 ml-auto">
                        <div class="col-sm-8">
                        <label for="exampleInputEmail1"><strong>Tag_AgeRange</strong></label>
                            <Dropdown Tags={this.Tag_AgeRange} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_AgeRange'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_AgeRange')} />
                        </div>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-4 ml-auto">
                        <div class="col-sm-10">
                        <label for="exampleInputEmail1"><strong>Tag_Duration</strong></label>
                            <Dropdown Tags={this.Tag_Duration} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_Duration'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_Duration')} />
                        </div>
                    </div>
                    <div class="col-md-5 ml-auto">
                    <div class="col-sm-8">
                        <label for="exampleInputEmail1"><strong>Duration details</strong></label>
                        <input type="text" class="form-control" ref = "AdditionalDetails" defaultValue = {this.props.ValueFromDb ? this.props.ValueFromDb['AdditionalDurationDetails'] : ''} onBlur = {this.selectedTags.bind(this)}/>
                            {/* <Dropdown Tags={this.state.tagAgeRangeData} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_AgeRange'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_AgeRange')} /> */}
                        </div>

                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-4 ml-auto">
                    <div class="col-sm-10">
                        <label for="exampleInputEmail1"><strong>Tag_LanguageOfInstruction</strong></label>
                            <Dropdown Tags={this.Tag_LanguageOfInstruction} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_LanguageOfInstruction'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_LanguageOfInstruction')} />
                        </div>
                    </div>
                    <div class="col-md-5 ml-auto">
                    <div class="col-sm-8">
                        <label for="exampleInputEmail1"><strong>Tag_LanguageLearned</strong></label>
                            <Dropdown Tags={this.Tag_LanguageLearned} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_LanguageLearned'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_LanguageLearned')} />
                        </div>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-4 ml-auto">
                    <div class="col-sm-10">
                        <label for="exampleInputEmail1"><strong>Tag_Platform</strong></label>
                            <Dropdown Tags={this.Tag_Platform} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_Platform'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_Platform')} />
                        </div>
                    </div>
                    <div class="col-md-5 ml-auto">
                    <div class="col-sm-8">
                        <label for="exampleInputEmail1"><strong>Tag_Continent</strong></label>
                            <Dropdown Tags={this.Tag_Continent} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_Continent'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_Continent')} />
                        </div>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-4 ml-auto">
                    <div class="col-sm-10">
                        <label for="exampleInputEmail1"><strong>Tag_Country</strong></label>
                            <Dropdown Tags={this.Tag_Country} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_Country'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_Country')} />
                        </div>

                    </div>
                    <div class="col-md-5 ml-auto">
                    <div class="col-sm-8">
                        <label for="exampleInputEmail1"><strong>Tag_State</strong></label>
                            <Dropdown Tags={this.Tag_State} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_State'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_State')} />
                        </div>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-4 ml-auto">
                    <div class="col-sm-10">
                        <label for="exampleInputEmail1"><strong>Tag_City</strong></label>
                            <Dropdown Tags={this.Tag_City} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_City'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_City')} />
                        </div>
                    </div>
                    <div class="col-md-5 ml-auto">
                    <div class="col-sm-8">
                        <label for="exampleInputEmail1"><strong>Tag_Feature</strong></label>
                            <Dropdown Tags={this.Tag_Feature} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb['Tag_Feature'] : ''} bindedValue={this.bindVal.bind(this, 'Tag_Feature')} />
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <strong>Seleted Tags:</strong>
                    <br />
                    <label id="selectedTags">
                        {/* {this.props.ValueFromDb && !this.isTagExperienceChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_Experience']
                            : this.state.tagExperienceValue === '' ? '*' : this.state.tagExperienceValue}_ */}

                   {this.props.ValueFromDb && !this.isTagKeywordTopicChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_Topic']
                            : this.state.tagKeywordTopicValue === '' ? '*' : this.state.tagKeywordTopicValue}_

                    {this.props.ValueFromDb && !this.isTagWhenChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_When']
                            : this.state.tagWhenValue === '' ? '*' : this.state.tagWhenValue}_

                    {this.props.ValueFromDb && !this.isTagCourseTypeChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_CourseType']
                            : this.state.tagCourseTypeValue === '' ? '*' : this.state.tagCourseTypeValue}_

                    {this.props.ValueFromDb && !this.isTagAgeRangeChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_AgeRange']
                            : this.state.tagAgeRangeValue === '' ? '*' : this.state.tagAgeRangeValue}_

                    {this.props.ValueFromDb && !this.isTagDurationChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_Duration']
                            : this.state.tagDurationValue === '' ? '*' : this.state.tagDurationValue}_
                    
                    {this.props.ValueFromDb && !this.isTag_LanguageOfInstructionChnaged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_LanguageOfInstruction']
                            : this.state.tagLanguageOfInstructionValue === '' ? '*' : this.state.tagLanguageOfInstructionValue}_

                    {/* {this.props.ValueFromDb && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_LanguageOfInstruction']
                            : this.state.tagLocaloffice === '' ? '00' : '00'}_ */}

                    {this.props.ValueFromDb && !this.isTagLanguageChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_LanguageLearned']
                            : this.state.tagLanguageValue === '' ? '*' : this.state.tagLanguageValue}_

                    {this.props.ValueFromDb && !this.isTagPlatformChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_Platform']
                            : this.state.tagPlatformValue === '' ? '*' : this.state.tagPlatformValue}_

                    {this.props.ValueFromDb && !this.isTagContinentChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_Continent']
                            : this.state.tagContinentValue === '' ? '*' : this.state.tagContinentValue}_

                    {this.props.ValueFromDb && !this.isTagCountryChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_Country']
                            : this.state.tagCountryValue === '' ? '*' : this.state.tagCountryValue}_

                    {this.props.ValueFromDb && !this.isTagStateChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_State']
                            : this.state.tagStateValue === '' ? '*' : this.state.tagStateValue}_

                    {this.props.ValueFromDb && !this.isTagCityChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_City']
                            : this.state.tagCityValue === '' ? '*' : this.state.tagCityValue}_

                    {this.props.ValueFromDb && !this.isTagFeatureChanged && this.props.ValueFromDb.length === undefined ? this.props.ValueFromDb['Tag_Feature']
                            : this.state.tagFeatureValue === '' ? '*' : this.state.tagFeatureValue}
                    </label>
                </div>
                <div>
                </div>
            </div>
        );
    }
}

export default SearchByTag;
