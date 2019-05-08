import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import * as Generic from '../../utils/generic';
import * as Constant from '../../utils/constant';
import DownloadIcon from '../Icons/SearchResult_Download.png';
import { connect } from 'react-redux';

import treeTableHOC from "react-table/lib/hoc/treeTable";
const TreeTable = treeTableHOC(ReactTable);

class AgeReport extends Component {
    constructor() {
        super();
        this.state = {
            flag: false
        }
    }

    exportAgeGroupReport() {
        Generic.ExportExcel(this.props.storeData._ageGroupReportData, "AgeGroup", "Age_Group_Report")
    }

    async generateAgeGroupReport() {
        this.props.dispatch({ type: 'Store_AgeGroupReportGenerated', data: false }); // Age Group report generation in progress
        this.props.dispatch({ type: 'Store_AgeGroupReportMarketCode', data: this.props.storeData._selectedMarket }); //Market code ran for age group generation 

        var marketCode = this.props.storeData._selectedMarket
        var marketSpecificPages = this.props.storeData._uniqueContentData.filter(m => m.MarketCode === marketCode);
        this.ageGroupData = [];

        for (var i = 0; i < marketSpecificPages.length; i++) {
            //If the market is changed while processing the request, Abort the earlier process and generate report for the new request
            if (marketCode !== this.props.storeData._selectedMarket) {
                this.ageGroupData = [];
                break;
                //this.generateAgeGroupReport();
            }

            //Generate report based on the selected market
            var pageUrl = marketSpecificPages[i]['PageUrl'];
            var endPoint = `https://ctdev.ef.com/common/ef-services/PG2Services/api/CommonService/GetPageContent/?mc=${marketCode}&pageUrl=${pageUrl}`
            var response = await fetch(endPoint).then(res => res.clone().json());
            response ?
                response.AgeGroups.map(m => this.ageGroupData.push({
                    PageUrl: pageUrl,
                    MarketCode: marketCode,
                    AgeGroupCode: m.AgeGroupCode,
                    Tag_AgeRange: m.SystemAgeStart + '-' + m.SystemAgeEnd,
                    Products: m.MappedProducts
                })) : '';
        }

        this.props.dispatch({ type: 'Store_AgeGroupReportGenerated', data: true }); //Age Group report generation in completed
        this.props.dispatch({ type: 'Store_AgeGroupReportData', data: this.ageGroupData });// Age group report data
        this.setState({ flag: true });
    }

    initiateReportGeneration() {
        //Check if market is changed
        var isMarketChanged;
        isMarketChanged = this.props.storeData._ageGroupMarketCode
            ? this.props.storeData._ageGroupMarketCode !== this.props.storeData._selectedMarket
                ? true
                : false
            : true;

        //Generate age group report only if market is changed
        isMarketChanged ? this.generateAgeGroupReport() : '';
    }

    render() {

        //Start the preceeding only if market is selected.
        if (this.props.storeData._selectedMarket) {
            this.initiateReportGeneration()
        }
        return (
            !this.props.storeData._selectedMarket
                ? <div className="itemDiv add-users__wrapper">
                    <div className="container">
                        <div className="alert alert-danger" role="alert">
                            <p>{Constant.ERROR_SELECT_MARKET}</p> <br />
                        </div>
                    </div>
                </div>
                : !this.props.storeData._ageGroupReportGenerated
                    ? <div className="itemDiv add-users__wrapper">
                        <div className="container">
                            <div className="alert alert-info" role="alert">
                                <span className="alert-text__info strong__text">We are processing your request to generate the report, it may take few minutes. Please come back later.</span> <br />
                            </div>
                        </div>
                    </div>
                    : <div className="itemDiv add-users__wrapper">
                        <div className="container">
                            <TreeTable
                                data={this.props.storeData._ageGroupReportData}
                                minRows={0}
                                columns={[
                                    {
                                        Header: <div className="header-icon__wrapper">
                                            <span className="imageFloatLeft"><img src={DownloadIcon} onClick={this.exportAgeGroupReport.bind(this)} alt="Download" data-toggle="tooltip" data-placement="top" title="Download" /></span>
                                        </div>,
                                        columns: [
                                            {
                                                Header: <strong>Page Url</strong>,
                                                id: "PageUrl",
                                                accessor: d => d.PageUrl,
                                                sortable: false,
                                            },
                                            {
                                                Header: <strong>Market Code</strong>,
                                                id: "MarketCode",
                                                accessor: d => d.MarketCode,
                                                sortable: false,
                                            },
                                            {
                                                Header: <strong>Age Group Code</strong>,
                                                id: "AgeGroupCode",
                                                accessor: d => d.AgeGroupCode,
                                                sortable: false,
                                            },
                                            {
                                                Header: <strong>Tag_AgeRange</strong>,
                                                id: "AgeRange",
                                                accessor: d => d.Tag_AgeRange,
                                                sortable: false,
                                            },
                                            {
                                                Header: <strong>Products</strong>,
                                                id: "Products",
                                                accessor: d => d.Products,
                                                sortable: false,
                                            }
                                        ]
                                    }
                                ]}
                                pivotBy={["PageUrl"]}
                                defaultPageSize={10}
                                className="-striped -highlight add-user__table"
                                expanded={this.state.expanded}
                                onExpandedChange={expanded => this.setState({ expanded })}
                            />
                        </div>
                    </div>
        )
    }
}
export default connect((state, props) => { return { storeData: state } })(AgeReport);
