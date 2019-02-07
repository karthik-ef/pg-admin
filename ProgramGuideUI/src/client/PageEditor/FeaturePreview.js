import React, { Component } from 'react';
import Table from "react-table";

import * as API from '../../utils/endpoints';

class FeaturePreview extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        //if(this.props.Type !== 'DrillDownAlias'){
            this.drillDownAlais = await fetch(API.getDrillDownAliasDetails).then(res => res.clone().json());
            this.generateData()
        //}
    }

    generateData() {

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
                        if (item[info[n]["Field"]] === '00' || item[info[n]["Field"]] === '' || item[info[n]["Field"]] === null ) {
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

        var arrSelectedTags = this.props.setData.toString().split('_');
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
            { Field: "Tag_Feature", Values: arrSelectedTags[12] }
        ];

        //var drillDownAliasData = this.props.UniqueContentData.filter(m => m.DrillDownAlias !== '' && m.DrillDownAlias !== null);
        var data = [];
        if(this.props.Type !== 'DrillDownAlias'){

        console.log(this.props.UniqueContentData);
        console.log(this.drillDownAlais);
        var mergedPageTags = [];
        this.drillDownAlais.forEach(element => {
            var arrDrillDownTags = element['DrilldownAlias'].includes('_') ? element['DrilldownAlias'].toString().split('_') : [];
            if(arrDrillDownTags.length === 13){
                var newUniqueContent = {};
                newUniqueContent.Tag_Topic = arrDrillDownTags[0];
                newUniqueContent.Tag_When = arrDrillDownTags[1];
                newUniqueContent.Tag_CourseType = arrDrillDownTags[2];
                newUniqueContent.Tag_AgeRange = arrDrillDownTags[3];
                newUniqueContent.Tag_Duration = arrDrillDownTags[4];
                newUniqueContent.Tag_LanguageOfInstruction = arrDrillDownTags[5];
                newUniqueContent.Tag_LanguageLearned = arrDrillDownTags[6];
                newUniqueContent.Tag_Platform = arrDrillDownTags[7];
                newUniqueContent.Tag_Continent = arrDrillDownTags[8];
                newUniqueContent.Tag_Country = arrDrillDownTags[9];
                newUniqueContent.Tag_State = arrDrillDownTags[10];
                newUniqueContent.Tag_City = arrDrillDownTags[11];
                newUniqueContent.Tag_Feature = arrDrillDownTags[12];
                newUniqueContent.UniqueContent_ID = element['UniqueContent_ID'];
                mergedPageTags.push(newUniqueContent);
            }
        });

        console.log(mergedPageTags);

        var uniqueContentIdOfMergedPages = mergedPageTags.flexFilter(filterCriteria.filter(m => m.Values !== '*')).map(m => m.UniqueContent_ID);
        console.log(uniqueContentIdOfMergedPages);
        var featureTagResult = this.props.UniqueContentData.flexFilter(filterCriteria.filter(m => m.Values !== '*'));
        console.log(featureTagResult);
        var drillDownResult = this.props.UniqueContentData.filter(m =>uniqueContentIdOfMergedPages.includes(m.UniqueContent_ID));
        console.log(drillDownResult);
         data = featureTagResult.concat(drillDownResult)
    }

    else{
        data = this.props.UniqueContentData.flexFilter(filterCriteria.filter(m => m.Values !== '*'));
    }

        this.setState({data : data});
    }
    
    render() {
        console.log(this.state.data)
        return (
            <Table
                // data={[{"PageUrl" : 'sss', "PageTitle" : 'ddd'}]}
                data = {this.state.data}
                minRows={0}
                columns={[
                    {
                        columns: [
                            {
                                Header: <strong>Page URL</strong>,
                                id: "PageUrl",
                                accessor: d => d.PageUrl,
                                sortable: false
                            },
                            {
                                Header: <strong>Page Title</strong>,
                                id: "PageTitle",
                                accessor: d => d.PageTitle,
                                sortable: false
                            }
                        ]
                    }
                ]}

                defaultPageSize={10}
                showPageSizeOptions = {false}
                showPageJump = {false}
                className="-striped -highlight"
            />
        );
    }
}

export default FeaturePreview;
