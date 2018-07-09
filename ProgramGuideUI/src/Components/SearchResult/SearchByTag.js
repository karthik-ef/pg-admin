import React, { Component } from 'react';
import $ from 'jquery';
import Dropdown from '../CustomizedDropDown';

class SearchByTag extends Component {
    constructor() {
        super();
        this.state = {
            login: [],
            tagExperienceData: [],
            tagKeywordTopicData: [],
            tagWhenData: [],
            tagCourseTypeData: [],
            tagAgeRangeData: [],
            tagDurationData: [],
            tagLanguageData: [],
            tagPlatformData: [],
            tagContinentData: [],
            tagCountryData: [],
            tagStateData: [],
            tagCityData: [],
            tagFeatureData: [],
            tagExperienceValue: '',
            tagKeywordTopicValue: '',
            tagWhenValue: '',
            tagCourseTypeValue: '',
            tagAgeRangeValue: '',
            tagDurationValue: '',
            tagLanguageValue: '',
            tagPlatformValue: '',
            tagContinentValue: '',
            tagCountryValue: '',
            tagStateValue: '',
            tagCityValue: '',
            tagFeatureValue: ''
        }
    }
    getTagData() {
        $.ajax({
            url: 'http://ctdev.ef.com:3001/SearchByTag',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ tagExperienceData: data.filter(m => m.TagName === "Tag_Experience").map(m => { return { label: m.Value, value: m.Value } }) });
                this.setState({ tagKeywordTopicData: data.filter(m => m.TagName === "Tag_KeywordTopic").map(m => { return { label: m.Value, value: m.Value } }) });
                this.setState({ tagWhenData: data.filter(m => m.TagName === "Tag_When").map(m => { return { label: m.Value, value: m.Value } }) });
                this.setState({ tagCourseTypeData: data.filter(m => m.TagName === "Tag_CourseType").map(m => { return { label: m.Value, value: m.Value } }) });
                this.setState({ tagAgeRangeData: data.filter(m => m.TagName === "Tag_AgeRange").map(m => { return { label: m.Value, value: m.Value } }) });
                this.setState({ tagDurationData: data.filter(m => m.TagName === "Tag_Duration").map(m => { return { label: m.Value, value: m.Value } }) });
                this.setState({ tagLanguageData: data.filter(m => m.TagName === "Tag_Language").map(m => { return { label: m.Value, value: m.Value } }) });
                this.setState({ tagPlatformData: data.filter(m => m.TagName === "Tag_Platform").map(m => { return { label: m.Value, value: m.Value } }) });
                this.setState({ tagContinentData: data.filter(m => m.TagName === "Tag_Continent").map(m => { return { label: m.Value, value: m.Value } }) });
                this.setState({ tagCountryData: data.filter(m => m.TagName === "Tag_Country").map(m => { return { label: m.Value, value: m.Value } }) });
                this.setState({ tagStateData: data.filter(m => m.TagName === "Tag_State").map(m => { return { label: m.Value, value: m.Value } }) });
                this.setState({ tagCityData: data.filter(m => m.TagName === "Tag_City").map(m => { return { label: m.Value, value: m.Value } }) });
                this.setState({ tagFeatureData: data.filter(m => m.TagName === "Tag_Feature").map(m => { return { label: m.Value, value: m.Value } }) });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

    }

    getAuth(){
        $.ajax({
            url: 'http://localhost:53181/api/user/PostUserForPg',
            type: 'POST',
            dataType: 'json',
            data: {"userName": "karthik.subbarayappa",
            "password": "$picity12"},
            cache: false,
            success: function (data) {
                console.log(data['AuthenticationResponse']);
                alert('success')
                this.setState({login: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

    }

    componentDidMount() {
        this.getAuth();
        this.getTagData();
        $(window).on('load', function () {
            $('#exampleModalLong').modal('show');
        });
    }

    bindVal(TagName, value) {
        if (TagName === 'Tag_Experience') {
            this.setState({ tagExperienceValue: value });
        }
        else if (TagName === 'Tag_KeywordTopic') {
            this.setState({ tagKeywordTopicValue: value });
        }
        else if (TagName === 'Tag_When') {
            this.setState({ tagWhenValue: value });
        }
        else if (TagName === 'Tag_CourseType') {
            this.setState({ tagCourseTypeValue: value });
        }
        else if (TagName === 'Tag_AgeRange') {
            this.setState({ tagAgeRangeValue: value });
        }
        else if (TagName === 'Tag_Duration') {
            this.setState({ tagDurationValue: value });
        }
        else if (TagName === 'Tag_Language') {
            this.setState({ tagLanguageValue: value });
        }
        else if (TagName === 'Tag_Platform') {
            this.setState({ tagPlatformValue: value });
        }
        else if (TagName === 'Tag_Continent') {
            this.setState({ tagContinentValue: value });
        }
        else if (TagName === 'Tag_Country') {
            this.setState({ tagCountryValue: value });
        }
        else if (TagName === 'Tag_State') {
            this.setState({ tagStateValue: value });
        }
        else if (TagName === 'Tag_City') {
            this.setState({ tagCityValue: value });
        }
        else if (TagName === 'Tag_Feature') {
            this.setState({ tagFeatureValue: value });
        }
    }

    render() {
        console.log(this.state.login)
        return (
            <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Search By Tag</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <strong>Please use the options below to specify one or more tags to start your search</strong>
                            <br />
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                    <div class="col-sm-10">
                                        <label for="exampleInputEmail1"><strong>Tag_Experience</strong></label>
                                        <Dropdown Tags={this.state.tagExperienceData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_Experience')} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                    <div class="col-sm-8">
                                        <label for="exampleInputEmail1"><strong>Tag_KeywordTopic</strong></label>
                                        <Dropdown Tags={this.state.tagKeywordTopicData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_KeywordTopic')} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                    <div class="col-sm-10">
                                        <label for="exampleInputEmail1"><strong>Tag_When</strong></label>
                                        <Dropdown Tags={this.state.tagWhenData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_When')} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                    <div class="col-sm-8">
                                        <label for="exampleInputEmail1"><strong>Tag_CourseType</strong></label>
                                        <Dropdown Tags={this.state.tagCourseTypeData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_CourseType')} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                    <div class="col-sm-10">
                                        <label for="exampleInputEmail1"><strong>Tag_AgeRange</strong></label>
                                        <Dropdown Tags={this.state.tagAgeRangeData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_AgeRange')} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                    <div class="col-sm-8">
                                        <label for="exampleInputEmail1"><strong>Tag_Duration</strong></label>
                                        <Dropdown Tags={this.state.tagDurationData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_Duration')} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                    <div class="col-sm-10">
                                        <label for="exampleInputEmail1"><strong>Tag_Language</strong></label>
                                        <Dropdown Tags={this.state.tagLanguageData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_Language')} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                    <div class="col-sm-8">
                                        <label for="exampleInputEmail1"><strong>Tag_Platform</strong></label>
                                        <Dropdown Tags={this.state.tagPlatformData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_Platform')} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                    <div class="col-sm-10">
                                        <label for="exampleInputEmail1"><strong>Tag_Continent</strong></label>
                                        <Dropdown Tags={this.state.tagContinentData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_Continent')} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                    <div class="col-sm-8">
                                        <label for="exampleInputEmail1"><strong>Tag_Country</strong></label>
                                        <Dropdown Tags={this.state.tagCountryData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_Country')} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                    <div class="col-sm-10">
                                        <label for="exampleInputEmail1"><strong>Tag_State</strong></label>
                                        <Dropdown Tags={this.state.tagStateData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_State')} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                    <div class="col-sm-8">
                                        <label for="exampleInputEmail1"><strong>Tag_City</strong></label>
                                        <Dropdown Tags={this.state.tagCityData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_City')} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                    <div class="col-sm-10">
                                        <label for="exampleInputEmail1"><strong>Tag_Feature</strong></label>
                                        <Dropdown Tags={this.state.tagFeatureData} multiSelect={true} bindedValue={this.bindVal.bind(this, 'Tag_Feature')} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-8 ml-auto">
                                    <div class="col-sm-12">
                                        <label for="exampleInputEmail1"><strong>Seleted Tags:</strong></label>
                                        <br />
                                        {this.state.tagExperienceValue === '' ? '*' : this.state.tagExperienceValue}_
                                    {this.state.tagKeywordTopicValue === '' ? '*' : this.state.tagKeywordTopicValue}_
                                    {this.state.tagWhenValue === '' ? '*' : this.state.tagWhenValue}_
                                    {this.state.tagCourseTypeValue === '' ? '*' : this.state.tagCourseTypeValue}_
                                    {this.state.tagAgeRangeValue === '' ? '*' : this.state.tagAgeRangeValue}_
                                    {this.state.tagDurationValue === '' ? '*' : this.state.tagDurationValue}_
                                    {this.state.tagLanguageValue === '' ? '*' : this.state.tagLanguageValue}_
                                    {this.state.tagPlatformValue === '' ? '*' : this.state.tagPlatformValue}_
                                    {this.state.tagContinentValue === '' ? '*' : this.state.tagContinentValue}_
                                    {this.state.tagCountryValue === '' ? '*' : this.state.tagCountryValue}_
                                    {this.state.tagStateValue === '' ? '*' : this.state.tagStateValue}_
                                    {this.state.tagCityValue === '' ? '*' : this.state.tagCityValue}_
                                    {this.state.tagFeatureValue === '' ? '*' : this.state.tagFeatureValue}
                                    </div>
                                </div>
                                <div class="col-md-1 ml-auto">
                                </div>
                            </div>
                            <div>
                            </div>
                            </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchByTag;