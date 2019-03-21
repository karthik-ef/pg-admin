import React, { Component } from 'react';
import Table from "react-table";
import DeleteIcon from '../Icons/Delete.png';
import * as Constant from '../../utils/constant';
import jsonxml from 'jsontoxml';
import * as API from '../../api/Publish';
import { connect } from 'react-redux';

class PublishGrid extends Component {

    validateXml(data) {
        // console.log(data);
        return data.replace(/[<>&'"]/g, function (c) {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
        });
    }

    publishExistingPages() {
        var filteredExisitingPages = [], existingPages = [];

        //Fetch all the existing pages to be published
        this.props.setData.map(m =>
            filteredExisitingPages.push([m.UniqueContent_ID, m.MarketCode, m.PageUrl, m.Tag_Topic, m.Tag_When,
            m.Tag_CourseType, m.Tag_AgeRange, m.Tag_Duration, m.AdditionalDurationDetails,
            m.Tag_LanguageOfInstruction, m.Tag_LanguageLearned, m.Tag_Platform, m.Tag_Continent, m.Tag_Country,
            m.Tag_State, m.Tag_City, m.Tag_Feature, m.BannerImage, m.MetaTitle, m.MetaDescription, m.MetaRobot,
            m.PageTitle, m.VisibleIntroText, m.HiddenIntroText, m.SubHeader1, m.SubHeader2, m.ContentText1, m.ContentText2,
            m.BreadcrumbText, m.FeaturePageTag1, m.FeaturePageTag2, m.ParentPageID]
            )
        );

        //Content validation and array creation to convert it into XML
        filteredExisitingPages.forEach(element => {
            var validatedContent = [];
            //Validate each column and convert to it's equivalent XML
            element.forEach((content, i) => {
                if (i !== 0 && i !== 31) {
                    content = content !== null ? this.validateXml(content) : content;
                }
                validatedContent.push(content)
            });

            //Construct key value pair
            existingPages.push({
                UniqueContent: validatedContent.reduce(function (result, field, index) {
                    result[Constant.EXPORT_TO_EXCEL_COLUMNS[index]] = field;
                    return result;
                }, {})
            });
        });

        var xmlForExistingPages = jsonxml({ XmlDocument: existingPages });

        this.existingPageDetails = {
            userName: this.props.storeData._loginDetails.userName,
            userRole: this.props.storeData._loginDetails.roleName,
            xmlData: xmlForExistingPages.toString()
        }

        API.publishExistingPages.call(this);

        if (this.props.storeData._newPagesDetails.length > 0) {
            this.newlyCreatedPageDetails = {
                toAddress: 'karthik.subbarayappa@ef.com',
                pageDetails: this.props.storeData._newPagesDetails
            };
            //Send email notification to the users
            API.SendNotification.call(this);
        }

    }

    publishNewPages() {
    }

    publishPageAlias() {

    }

    publishCustomizedLinks() {

    }

    Publish() {
        this.publishExistingPages();

        // var excelContent = [];
        // var arr = [];
        // this.props.setData.map(m =>
        //     arr.push([m.UniqueContent_ID, m.MarketCode, m.PageUrl, m.Tag_Topic, m.Tag_When,
        //     m.Tag_CourseType, m.Tag_AgeRange, m.Tag_Duration, m.AdditionalDurationDetails,
        //     m.Tag_LanguageOfInstruction, m.Tag_LanguageLearned, m.Tag_Platform, m.Tag_Continent, m.Tag_Country,
        //     m.Tag_State, m.Tag_City, m.Tag_Feature, m.BannerImage, m.MetaTitle, m.MetaDescription, m.MetaRobot,
        //     m.PageTitle, m.VisibleIntroText, m.HiddenIntroText, m.SubHeader1, m.SubHeader2, m.ContentText1, m.ContentText2,
        //     m.BreadcrumbText, m.FeaturePageTag1, m.FeaturePageTag2, m.ParentPageID]
        //     )
        // );

        // arr.forEach((element, index) => {
        //     //First iteration contains column header
        //     //Perform validation on the uploaded data
        //     var formatedContent = [];
        //     element.forEach((content, i) => {
        //         if (i === 0 || i === 31) {
        //             if (isNaN(content)) {
        //                 this.validationFailed = true;
        //                 alert(Constant.EXPORT_TO_EXCEL_COLUMNS[i] + ' column should contain numeric value. Please correct and upload again');
        //             }
        //         }
        //         else {
        //             content = content !== null ? this.validateXml(content) : content;
        //         }
        //         formatedContent.push(content)
        //     });
        //     //Construct key value pair
        //     excelContent.push({
        //         UniqueContent: formatedContent.reduce(function (result, field, index) {
        //             result[Constant.EXPORT_TO_EXCEL_COLUMNS[index]] = field;
        //             return result;
        //         }, {})
        //     });
        // });

        // var xml = jsonxml({ XmlDocument: excelContent });

        // this.uploadExcelDetails = {};
        // this.uploadExcelDetails.userName = this.props.storeData._loginDetails.userName;
        // this.uploadExcelDetails.userRole = this.props.storeData._loginDetails.roleName;
        // this.uploadExcelDetails.xmlData = xml.toString();

        // API.UpdateDataToLive.call(this);
    }

    render() {
        return (
            <Table
                data={this.props.setData}
                minRows={0}
                columns={[{
                    Header: <div>
                        <button className="btn btn-primary" type="button" onClick={this.Publish.bind(this)} >Publish to LIVE</button>
                    </div>,
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
                        },
                        {
                            Header: '',
                            sortable: false,
                            width: 60,
                            Cell: row => (
                                <div>
                                    <span className="floatLeft"> <img src={DeleteIcon} alt="Logo" /></span>
                                </div>
                            )

                        }
                    ]
                }
                ]}
                getTdProps={(state, rowInfo, column, instance) => {
                    return {
                        onClick: (e, handleOriginal) => {

                            console.log(rowInfo['original']);
                            if (column['Header']['props'] === undefined) {
                                //alert('delete');
                                this.props.DeletedRow(rowInfo['original']);
                                //this.props.DeleteRow(rowInfo['original']);
                            }
                        }
                    };
                }}

                defaultPageSize={10}
                showPageSizeOptions={false}
                showPageJump={false}
                className="-striped -highlight"
            />
        );
    }
}

export default connect((state, props) => { return { storeData: state } })(PublishGrid);
