import axios from 'axios';
import * as API from '../utils/endPoint';
import * as Constant from '../utils/constant';
import { dataForDropDown } from '../utils/generic';

export function getTagData(){
    getDurationTags.call(this);
}

function getDurationTags() {
    axios.get(API.DURATION_TAG)
        .then(result => {
            this.Tag_Duration = dataForDropDown(result.data.map(m => {return {Value: m}}));
            getPlatformTags.call(this);
        }).catch(err => { console.log(err) });
}

 function getPlatformTags() {
    axios.get(API.PLATFORM_TAG)
        .then(result => {
            console.log(result);
            this.Tag_Platform = dataForDropDown(result.data.map(m => {return {Value: m}}));
            getRemainingTags.call(this);
        }).catch(err => { console.log(err) });
}

 function getRemainingTags() {
    axios.get(API.REMAINING_TAG + localStorage.getItem('Market'))
        .then(result => {
            //console.log(result.data);
            this.Tag_Topic = dataForDropDown(result.data.filter(m => m.TagName === Constant.Tag_Topic));
            this.Tag_When = dataForDropDown(result.data.filter(m => m.TagName === Constant.Tag_When));
            this.Tag_CourseType = dataForDropDown(result.data.filter(m => m.TagName === Constant.Tag_CourseType));
            this.Tag_AgeRange = dataForDropDown(result.data.filter(m => m.TagName === Constant.Tag_AgeRange));
            this.Tag_LanguageOfInstruction = dataForDropDown(result.data.filter(m => m.TagName === Constant.Tag_LanguageOfInstruction));
            this.Tag_LanguageLearned = dataForDropDown(result.data.filter(m => m.TagName === Constant.Tag_LanguageLearned));
            this.Tag_Continent = dataForDropDown(result.data.filter(m => m.TagName === Constant.Tag_Continent));
            this.Tag_Country = dataForDropDown(result.data.filter(m => m.TagName === Constant.Tag_Country));
            this.Tag_State = dataForDropDown(result.data.filter(m => m.TagName === Constant.Tag_State));
            this.Tag_City = dataForDropDown(result.data.filter(m => m.TagName === Constant.Tag_City));
            this.Tag_Feature = dataForDropDown(result.data.filter(m => m.TagName === Constant.Tag_Feature));
            this.buildDropDownComponent();
        }).catch(err => { console.log(err) });
}