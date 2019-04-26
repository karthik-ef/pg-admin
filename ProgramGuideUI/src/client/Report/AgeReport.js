import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import * as Generic from '../../utils/generic';
import DownloadIcon from '../Icons/SearchResult_Download.png';
import { connect } from 'react-redux';

import treeTableHOC from "react-table/lib/hoc/treeTable";
const TreeTable = treeTableHOC(ReactTable);

class AgeReport extends Component {
    constructor() {
        super();
        this.data = [];
        this.state = {
            flag: false
        }
    }

    async data1() {
        this.dataFetchInProgress = true;
        var marketCode = this.props.storeData._selectedMarket
        var marketSpecificPages = this.props.storeData._uniqueContentData.filter(m => m.MarketCode === marketCode);
        this.data = [];

        for (var i = 0; i < 10; i++) {
            var pageUrl = marketSpecificPages[i]['PageUrl'];
            var endPoint = `https://ctdev.ef.com/common/ef-services/PG2Services/api/CommonService/GetPageContent/?mc=${marketCode}&pageUrl=${pageUrl}`
            var response = await fetch(endPoint).then(res => res.clone().json());
            response ?
                response.AgeGroups.map(m => this.data.push({
                    PageUrl: pageUrl,
                    MarketCode: marketCode,
                    AgeGroupCode: m.AgeGroupCode,
                    AgeRange: m.SystemAgeStart + '-' + m.SystemAgeEnd,
                    Products: m.MappedProducts
                })) : '';
        }
        this.setState({ flag: true });
    }

    exportAgeGroupReport() {
        Generic.ExportExcel(this.data, "AgeGroup", "Age_Group_Report")
    }

    render() {
        !this.dataFetchInProgress && this.props.storeData._userMarkets
            && this.props.storeData._userMarkets.length > 0 && !this.state.flag ? this.data1() : ''
        return (
            !this.state.flag
                ? <div className="itemDiv add-users__wrapper">
                    <div className="container">
                        <div className="alert alert-info" role="alert">
                            <span className="alert-text__info strong__text">We are processing your request to generate the Age Group Report now, it may take a few minutes. Please come back later.</span> <br />
                        </div>
                    </div>
                </div>
                : <div className="itemDiv add-users__wrapper">
                    <div className="container">
                        <TreeTable
                            data={this.data}
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
                                            Header: <strong>Age Range</strong>,
                                            id: "AgeRange",
                                            accessor: d => d.AgeRange,
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
                            className="-striped -highlight add-user__table"
                            showPagination={false}
                            showPageSizeOptions={false}
                            expanded={this.state.expanded}
                            onExpandedChange={expanded => this.setState({ expanded })}
                        />
                    </div>
                </div>
        )
    }
}
export default connect((state, props) => { return { storeData: state } })(AgeReport);
