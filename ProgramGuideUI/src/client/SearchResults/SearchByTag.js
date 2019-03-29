import React, { Component } from 'react';
import $ from 'jquery';
import Dropdown from '../CustomControls/DropDown';
import * as Constant from '../../utils/constant';
import { connect } from 'react-redux';
import { dataForDropDown } from '../../utils/generic';
import * as Path from '../../utils/routepath';

class SearchByTag extends Component {
    constructor() {
        super();
        this.tagDurationAdditionalInfoRef = React.createRef();
        this.Tag_Topic_Value
            = this.Tag_When_Value = this.Tag_CourseType_Value = this.Tag_AgeRange_Value = this.Tag_Duration_Value
            = this.Tag_LanguageOfInstruction_Value = this.Tag_LanguageLearned_Value = this.Tag_Platform_Value = this.Tag_Continent_Value
            = this.Tag_Country_Value = this.Tag_State_Value = this.Tag_City_Value = this.Tag_Feature_Value = "*";

        this.state = {
            refreshPage: false
        }
    }
    // Code refactoring

    componentDidMount() {
        $('#exampleModalLong').modal('show');

        var ageRangeData = []
        //Generate tag value for AgeRange
        for (var x = 0; x < Constant.Age_Range.length; x++) {
            for (var y = 1; y < Constant.Age_Range.length; y++) {
                if (Constant.Age_Range[x] < Constant.Age_Range[y]) {
                    var startAgeRange = Constant.Age_Range[x] !== 0 && Constant.Age_Range[x] < 10 ? '0' + Constant.Age_Range[x] : Constant.Age_Range[x];
                    var endAgeRange = Constant.Age_Range[y] < 10 ? '0' + Constant.Age_Range[y] : Constant.Age_Range[y];
                    ageRangeData.push({
                        TagName: Constant.Tag_AgeRange,
                        Value: startAgeRange + '-' + endAgeRange
                    })
                }
            }
        }

        this.props.ValueFromDb && this.props.ValueFromDb.length === 0
            //Tag values for create page
            ? Constant.Tag_Collection.forEach(element => {
                element === Constant.Tag_Topic // Tag_Topic value is market specific
                    ? this[element] = dataForDropDown(this.props.storeData._uniqueContentTags.filter(m => m.TagName === element && m.MarketCode === this.props.storeData._selectedMarket)
                        .map(m => { return { Value: m.Value } }))
                    : element === Constant.Tag_AgeRange //Tag_AgeRange is combination of value from 0-99
                        ? this[element] = dataForDropDown(ageRangeData.map(m => { return { Value: m.Value } }))
                        : this[element] = dataForDropDown(this.props.storeData._createPageTags.filter(m => m.TagName === element)
                            .map(m => { return { Value: m.Value } }))
            })
            //Tag values for filter and content editor pages
            : Constant.Tag_Collection.forEach(element => {
                element === Constant.Tag_Duration // Drop down data for duration tag
                    ? this[element] = dataForDropDown(this.props.storeData._durationTags.map(m => { return { Value: m } }))
                    : element === Constant.Tag_Platform // Drop down data for platform tag
                        ? this[element] = dataForDropDown(this.props.storeData._platformTags.map(m => { return { Value: m } }))
                        //Else drop down data for rest of the tags
                        : window.location.pathname === Path.ExportPgData //drop down data for other tags for user markets
                            ? this[element] = dataForDropDown(this.props.storeData._uniqueContentTags.filter(m => m.TagName === element)
                                .map(m => { return m.Value })
                                .filter((x, i, a) => { return a.indexOf(x) === i }).map(m => { return { Value: m } }))
                            //Else drop down data for other tags only for selected market
                            : this[element] = dataForDropDown(this.props.storeData._uniqueContentTags.filter(m => m.TagName === element && m.MarketCode === this.props.storeData._selectedMarket)
                                .map(m => { return { Value: m.Value } }))
            });

        this.buildDropDownComponent();
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
        var leftDropDownComponent = [];
        var rightDropDownComponent = [];
        this.tagComponent = [];
        var rowCount = 7; // Number of row displayed

        Constant.Tag_Collection.forEach((element, index) => {
            if (index % 2 === 0) {
                //Left drop down component
                leftDropDownComponent.push(<div className="col-md-6">
                    <div className="tag__select">
                        <label htmlFor="exampleInputEmail1"><strong>{element}</strong></label>
                        {element === Constant.Tag_Duration_Details
                            ? <input type="text" ref={this.tagDurationAdditionalInfoRef} onBlur={this.selectedTagValue.bind(this, element)} className="form-control" defaultValue={this.props.ValueFromDb ? this.props.ValueFromDb['AdditionalDurationDetails'] : ''} />
                            : <Dropdown Tags={this[element]} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb[element] : ''} bindedValue={this.selectedTagValue.bind(this, element)} />}
                    </div>
                </div>)
            }
            else {
                //Right drop down component
                rightDropDownComponent.push(<div className="col-md-6">
                    <div className="tag__select">
                        <label htmlFor="exampleInputEmail1"><strong>{element}</strong></label>
                        {element === Constant.Tag_Duration_Details
                            ? <input type="text" ref={this.tagDurationAdditionalInfoRef} onBlur={this.selectedTagValue.bind(this, element)} className="form-control" defaultValue={this.props.ValueFromDb ? this.props.ValueFromDb['AdditionalDurationDetails'] : ''} />
                            : <Dropdown Tags={this[element]} multiSelect={true} SetInitalValue={this.props.ValueFromDb ? this.props.ValueFromDb[element] : ''} bindedValue={this.selectedTagValue.bind(this, element)} />}
                    </div>
                </div>)
            }
            // Check if it's opened from content editor and assign corresponding value
            this.props.ValueFromDb ? this.selectedTagValue(element, this.props.ValueFromDb[element]) : '';

        });

        // 
        for (var index = 0; index < rowCount; index++) {
            this.tagComponent.push(<div className="row" key={index}>
                {leftDropDownComponent[index]}
                {rightDropDownComponent[index]}
            </div>
            )
        }
        this.setState({ refreshPage: !this.state.refreshPage });
    }

    render() {
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

export default connect((state, props) => { return { storeData: state } })(SearchByTag);
