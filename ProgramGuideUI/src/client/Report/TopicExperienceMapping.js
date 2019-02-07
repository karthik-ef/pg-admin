import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Loader from '../CustomControls/LoadingScreen';

import { GetMarkets } from '../../server/Api';

import * as Generic from '../../utils/generic';

import * as ENDPOINT from '../../utils/endpoints';

import ReactExport from "react-data-export";
import DownloadIcon from '../Icons/SearchResult_Download.png';
// Excel Declarations
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class TopicExperienceMapping extends Component {
    constructor() {
        super();
        this.data = [];
        this.state = {
            availableMarkets: [],
            flag: false
        }
    }

    componentDidMount() {
        GetMarkets.call(this);
    }

    async data1() {
        for (var i = 0; i < this.state.availableMarkets.length; i++) {
            var response = await fetch(ENDPOINT.topicExperienceMappingDetails + this.state.availableMarkets[i].MarketCode).then(res => res.clone().json());
            response.map(m => this.data.push(m));
        }
        Generic.generateTopicExperienceMappingReport.call(this);
        this.setState({ flag: true });
    }

    render() {
        this.state.availableMarkets.length > 0 && !this.state.flag ? this.data1() : ''

        if (!this.state.flag) {
            return (
                <Loader />
            )
        }
        else {
            return (
                <div className="itemDiv add-users__wrapper">
                    <div className="container">
                        <ReactTable
                            data={this.data}
                            minRows={0}
                            columns={[
                                {
                                    Header: <div className="header-icon__wrapper">
                                        <ExcelFile filename="TopicExperienceMappingReport" element={<span className="imageFloatLeft"><img src={DownloadIcon} alt="Download" data-toggle="tooltip" data-placement="top" title="Download" /></span>}>
                                            <ExcelSheet dataSet={this.ExcelData} name="TopicExperienceMapping" />
                                        </ExcelFile>
                                    </div>,
                                    columns: [
                                        {
                                            Header: <strong>Market</strong>,
                                            id: "MarketCode",
                                            accessor: d => d.marketCode,
                                            sortable: false,
                                            width: 100
                                        },
                                        {
                                            Header: <strong>Tag Topic</strong>,
                                            id: "TagTopic",
                                            accessor: d => d.tagTopic,
                                            sortable: false,
                                            width: 180
                                        },
                                        {
                                            Header: <strong>Age Start</strong>,
                                            id: "AgeStart",
                                            accessor: d => d.ageStart,
                                            sortable: false,
                                            width: 80
                                        },
                                        {
                                            Header: <strong>Age End</strong>,
                                            id: "AgeEnd",
                                            accessor: d => d.ageEnd,
                                            sortable: false,
                                            width: 70
                                        },
                                        {
                                            Header: <strong>Tag Experience</strong>,
                                            id: "TagExperience",
                                            accessor: d => d.tagExperience,
                                            sortable: false,
                                            width: 150
                                        },
                                        {
                                            Header: <strong>Products</strong>,
                                            id: "Products",
                                            accessor: d => d.products,
                                            sortable: false,
                                            style: { 'whiteSpace': 'unset' }
                                        }
                                    ]
                                }
                            ]}
                            pivotBy={["MarketCode"]}
                            className="-striped -highlight add-user__table"
                            showPagination={false}
                            showPageSizeOptions={false}
                            expanded={this.state.expanded}
                            onExpandedChange={expanded => this.setState({ expanded })}
                        />
                    </div>
                </div>
            );
        }
    }
}
export default TopicExperienceMapping;
