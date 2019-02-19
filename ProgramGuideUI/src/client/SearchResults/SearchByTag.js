import React, { Component } from 'react';
import $ from 'jquery';
import Dropdown from '../CustomControls/DropDown';
import * as API from '../../api/SearchResults';
import * as Constant from '../../utils/constant';
import Loader from '../CustomControls/LoadingScreen';
import * as API_SearchResults from '../../api/SearchResults'

class SearchByTag extends Component {
    constructor() {
        super();
        this.isComponentLoaded = false;
        this.tagDurationAdditionalInfoRef = React.createRef();
        this.Tag_Topic_Value = this.Tag_When_Value = this.Tag_CourseType_Value = this.Tag_AgeRange_Value = this.Tag_Duration_Value
            = this.Tag_LanguageOfInstruction_Value = this.Tag_LanguageLearned_Value = this.Tag_Platform_Value = this.Tag_Continent_Value
            = this.Tag_Country_Value = this.Tag_State_Value = this.Tag_City_Value = this.Tag_Feature_Value = "*";

        this.state = {
            refreshPage: false
        }
    }
    // Code refactoring

    componentDidMount() {
        if (window.location.pathname.toLowerCase() === '/exportpgdata') {
            API_SearchResults.getUserMarkets.call(this);
        }
        else {
            API.getTagData.call(this);
        }

        $('#exampleModalLong').modal('show');

        var tagCollection = [Constant.Tag_Topic, Constant.Tag_When, Constant.Tag_CourseType, Constant.Tag_AgeRange,
        Constant.Tag_Duration, Constant.Tag_Duration_Details, Constant.Tag_LanguageOfInstruction, Constant.Tag_LanguageLearned, Constant.Tag_Platform, Constant.Tag_Continent,
        Constant.Tag_Country, Constant.Tag_State, Constant.Tag_City, Constant.Tag_Feature]

        if (this.props.ValueFromDb) {
            tagCollection.forEach(element => {
                this.selectedTagValue(element, this.props.ValueFromDb[element]);
            });
        }

    }

    selectedTagValue = (tagName, selectedValue) => {
        if (tagName !== Constant.Tag_Duration_Details) {
            tagName = tagName + '_Value';
            this[tagName] = selectedValue;
        }
        this.setState({ refreshPage: !this.state.refreshPage }, function () {
            var additionalDuration = !this.tagDurationAdditionalInfoRef.current ? Constant.EMPTY_STRING : this.tagDurationAdditionalInfoRef.current.value
            this.props.getSearchByTagData($('#selectedTags').text() + '_' + additionalDuration);
        });
    }

    buildDropDownComponent() {
        var tagCollection = [Constant.Tag_Topic, Constant.Tag_When, Constant.Tag_CourseType, Constant.Tag_AgeRange,
        Constant.Tag_Duration, Constant.Tag_Duration_Details, Constant.Tag_LanguageOfInstruction, Constant.Tag_LanguageLearned, Constant.Tag_Platform, Constant.Tag_Continent,
        Constant.Tag_Country, Constant.Tag_State, Constant.Tag_City, Constant.Tag_Feature]

        var leftDropDownComponent = [];
        var rightDropDownComponent = [];
        this.tagComponent = [];
        var rowCount = 7; // Number of row displayed

        tagCollection.forEach((element, index) => {
            if (index % 2 === 0) {
                //Left drop down component
                leftDropDownComponent.push(<div class="col-md-6">
                    <div class="tag__select">
                        <label for="exampleInputEmail1"><strong>{element}</strong></label>
                        {element === Constant.Tag_Duration_Details
                            ? <input type="text" ref={this.tagDurationAdditionalInfoRef} onBlur={this.selectedTagValue.bind(this, element)} class="form-control" defaultValue={this.props.ValueFromDb ? this.props.ValueFromDb['AdditionalDurationDetails'] : ''} />
                            : <Dropdown Tags={this[element]} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb[element] : ''} bindedValue={this.selectedTagValue.bind(this, element)} />}
                    </div>
                </div>)
            }
            else {
                //Right drop down component
                rightDropDownComponent.push(<div class="col-md-6">
                    <div class="tag__select">
                        <label for="exampleInputEmail1"><strong>{element}</strong></label>
                        {element === Constant.Tag_Duration_Details
                            ? <input type="text" ref={this.tagDurationAdditionalInfoRef} onBlur={this.selectedTagValue.bind(this, element)} class="form-control" defaultValue={this.props.ValueFromDb ? this.props.ValueFromDb['AdditionalDurationDetails'] : ''} />
                            : <Dropdown Tags={this[element]} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb[element] : ''} bindedValue={this.selectedTagValue.bind(this, element)} />}
                    </div>
                </div>)
            }
        });

        // 
        for (var index = 0; index < rowCount; index++) {
            this.tagComponent.push(<div class="row" key={index}>
                {leftDropDownComponent[index]}
                {rightDropDownComponent[index]}
            </div>
            )
        }
        this.isComponentLoaded = true;
        this.setState({ refreshPage: !this.state.refreshPage });
    }

    render() {
        console.log(this);
        if (!this.isComponentLoaded) {
            return (

                <div><strong>Loading....</strong></div>
                // <div class="tag__select">
                //     <Loader />
                // </div >
            )
        }
        else {
            return (
                <div >
                    <br />
                    <p>{Constant.SEARCH_TAG_HEADER}</p>
                    <div className="drop__selectors">
                        {this.tagComponent}
                    </div>
                    <br />
                    <strong>{Constant.SELECTED_TAG_HEADER}</strong>
                    <br />
                    <label id="selectedTags">
                        {`${this.Tag_Topic_Value}_${this.Tag_When_Value}_${this.Tag_CourseType_Value}_${this.Tag_AgeRange_Value}_${this.Tag_Duration_Value}_${this.Tag_LanguageOfInstruction_Value}_${this.Tag_LanguageLearned_Value}_${this.Tag_Platform_Value}_${this.Tag_Continent_Value}_${this.Tag_Country_Value}_${this.Tag_State_Value}_${this.Tag_City_Value}_${this.Tag_Feature_Value}`}
                    </label>
                </div>
            );
        }
    }
}

export default SearchByTag;
