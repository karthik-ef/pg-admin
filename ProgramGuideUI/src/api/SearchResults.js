import axios from 'axios';
import * as API from '../utils/endpoints';
import * as Constant from '../utils/constant';
import { dataForDropDown } from '../utils/generic';
import * as Generic from '../utils/generic';

export function getTagData(){
    getDurationTags.call(this);
}

export function GetUniqueContentData() {
    console.log(localStorage.getItem('Market'));
    axios.get(API.getUniqueContentDetails + localStorage.getItem('Market'))
      .then(result => {
        console.log(result.data);
        Generic.generateExcelReport.call(this);
        this.PageUrls = result.data.filter(m => m.IsActive).map(m => { return { name: m.PageUrl } });
        this.setState({ uniqueContentData: result.data });
      })
      .catch(err => {
        console.log(err);
      })
  }

function getDurationTags() {
    axios.get(API.getDurationTagDetails)
        .then(result => {
            this.Tag_Duration = dataForDropDown(result.data.map(m => {return {Value: m}}));
            getPlatformTags.call(this);
        }).catch(err => { console.log(err) });
}

 function getPlatformTags() {
    axios.get(API.getPlatformTagDetails)
        .then(result => {
            console.log(result);
            this.Tag_Platform = dataForDropDown(result.data.map(m => {return {Value: m}}));
            getRemainingTags.call(this);
        }).catch(err => { console.log(err) });
}

 function getRemainingTags() {
    axios.get(API.getSearchTagDetails + localStorage.getItem('Market'))
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