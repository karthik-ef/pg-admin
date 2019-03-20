import * as Constant from './constant';
import xmlFormat from 'xml-formatter';
import { saveAs } from 'file-saver';

export function dataForDropDown(data) {
    return data.map(m => { return { label: m.Value, value: m.Value } });
}

export function createSelectedTagArr(tagData) {
    var arrSelectedTags = tagData.split('_');
    var filterCriteria = [
        { Field: Constant.Tag_Topic, Values: arrSelectedTags[0] },
        { Field: Constant.Tag_When, Values: arrSelectedTags[1] },
        { Field: Constant.Tag_CourseType, Values: arrSelectedTags[2] },
        { Field: Constant.Tag_AgeRange, Values: arrSelectedTags[3] },
        { Field: Constant.Tag_Duration, Values: arrSelectedTags[4] },
        { Field: Constant.Tag_LanguageOfInstruction, Values: arrSelectedTags[5] },
        { Field: Constant.Tag_LanguageLearned, Values: arrSelectedTags[6] },
        { Field: Constant.Tag_Platform, Values: arrSelectedTags[7] },
        { Field: Constant.Tag_Continent, Values: arrSelectedTags[8] },
        { Field: Constant.Tag_Country, Values: arrSelectedTags[9] },
        { Field: Constant.Tag_State, Values: arrSelectedTags[10] },
        { Field: Constant.Tag_City, Values: arrSelectedTags[11] },
        { Field: Constant.Tag_Feature, Values: arrSelectedTags[12] },
        { Field: Constant.Tag_Duration_Details, Values: arrSelectedTags[13] }
    ];

    return filterCriteria;
}

export function generateExcelReport(ReportData) {
    return ([
        {
            columns: Constant.EXPORT_TO_EXCEL_COLUMNS,
            data: ReportData.map(m => {
                return [{ value: m.UniqueContent_ID.toString() }, { value: m.MarketCode }, { value: m.PageUrl },
                { value: m.Tag_Topic }, { value: m.Tag_When }, { value: m.Tag_CourseType }, { value: m.Tag_AgeRange },
                { value: m.Tag_Duration }, { value: m.AdditionalDurationDetails }, { value: m.Tag_LanguageOfInstruction }, { value: m.Tag_LanguageLearned }, { value: m.Tag_Platform }, { value: m.Tag_Continent },
                { value: m.Tag_Country }, { value: m.Tag_State }, { value: m.Tag_City }, { value: m.Tag_Feature },
                { value: m.BannerImage }, { value: m.MetaTitle }, { value: m.MetaDescription }, { value: m.MetaRobot },
                { value: m.PageTitle }, { value: m.VisibleIntroText },
                { value: m.HiddenIntroText }, { value: m.SubHeader1 }, { value: m.SubHeader2 }, { value: m.ContentText1 },
                { value: m.ContentText2 }, { value: m.BreadcrumbText },
                { value: m.FeaturePageTag1 }, { value: m.FeaturePageTag2 },
                { value: m.ParentPageID.toString() }]
            })
        }
    ])
}

export function generateTopicExperienceMappingReport() {
    this.ExcelData = [
        {
            columns: Constant.EXPORT_TOPIC_EXPERIENCE_MAPPING_REPORT,
            data: this.data.map(m => {
                return [{ value: m.marketCode }, { value: m.tagTopic }, { value: m.ageStart.toString() }, { value: m.ageEnd.toString() }, { value: m.tagExperience }, { value: m.products }]
            })
        }
    ]
}

export function generateSitemapXml(xmlReport, fileName){
    console.log(xmlReport);
    console.log(fileName);
    var blob = new Blob([xmlFormat(xmlReport)], { type: "text/xml" });
    saveAs(blob, fileName);
}

Array.prototype.flexFilter = function (info) {

    // Set our variables
    var matchesFilter, matches = [], count;

    // Helper function to loop through the filter criteria to find matching values
    // Each filter criteria is treated as "AND". So each item must match all the filter criteria to be considered a match.
    // Multiple filter values in a filter field are treated as "OR" i.e. ["Blue", "Green"] will yield items matching a value of Blue OR Green.
    matchesFilter = function (item) {
        count = 0
        for (var n = 0; n < info.length; n++) {

            if (info[n]["Values"] === '00') {
                console.log(item[info[n]["Field"]]);
                console.log(item[info[n]["Field"]] === "");
                if (item[info[n]["Field"]] === '00' || item[info[n]["Field"]] === "" || item[info[n]["Field"]] === null) {
                    count++;
                }
            }
            else if (info[n]["Values"] === '?') {
                if (item[info[n]["Field"]] !== '00' || !item[info[n]["Field"]]) {
                    count++;
                }
            }
            else {
                if (info[n]["Values"].indexOf(item[info[n]["Field"]]) > -1) {
                    count++;
                }
            }
        }
        // If TRUE, then the current item in the array meets all the filter criteria
        return count === info.length;
    }

    // Loop through each item in the array
    for (var i = 0; i < this.length; i++) {
        // Determine if the current item matches the filter criteria
        if (matchesFilter(this[i])) {
            matches.push(this[i]);
        }
    }

    // Give us a new array containing the objects matching the filter criteria
    return matches;
}