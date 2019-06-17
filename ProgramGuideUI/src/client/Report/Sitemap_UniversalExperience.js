import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import * as Generic from '../../utils/generic';
import * as Constant from '../../utils/constant';
import DownloadIcon from '../Icons/SearchResult_Download.png';
import { connect } from 'react-redux';
import * as StoreData from '../../store/api_store';

import treeTableHOC from "react-table/lib/hoc/treeTable";
const TreeTable = treeTableHOC(ReactTable);

class Sitemap_UniversalExperience extends Component {
    constructor() {
        super();
        this.state = {
            flag: false
        }
    }

    componentDidMount() {
        !this.props.storeData._sitemapUniversalExperience
            ? this.props.dispatch(StoreData.SitemapUniversalExperience.call(this))
            : '';
    }

    exportSitemapExperienceReport() {
        Generic.ExportExcel(this.props.storeData._sitemapUniversalExperience, "ExperienceLoop", "Sitemap_UniversalExperienceReport")
    }

    render() {
        return (
            //    <div className="itemDiv add-users__wrapper">
            //         <div className="container">
            //             <div className="alert alert-info" role="alert">
            //                 <span className="alert-text__info strong__text">We are processing your request to generate the report, it may take few minutes. Please come back later.</span> <br />
            //             </div>
            //         </div>
            //     </div>
            <div className="itemDiv add-users__wrapper">
                <div className="container">
                    <TreeTable
                        data={this.props.storeData._sitemapUniversalExperience}
                        minRows={0}
                        columns={[
                            {
                                Header: <div className="header-icon__wrapper">
                                    <span className="imageFloatLeft"><img src={DownloadIcon} onClick={this.exportSitemapExperienceReport.bind(this)} alt="Download" data-toggle="tooltip" data-placement="top" title="Download" /></span>
                                </div>,
                                columns: [
                                    {
                                        Header: <strong>Market Code</strong>,
                                        id: "MarketCode",
                                        accessor: d => d.MarketCode,
                                        sortable: false,
                                    },
                                    {
                                        Header: <strong>Tag_Topic</strong>,
                                        id: "Tag_Topic",
                                        accessor: d => d.Tag_Topic,
                                        sortable: false,
                                    },
                                    {
                                        Header: <strong>UniversalExperience</strong>,
                                        id: "UniversalExperience",
                                        accessor: d => d.UniversalExperience,
                                        sortable: false,
                                    }
                                ]
                            }
                        ]}
                        pivotBy={["MarketCode"]}
                        defaultPageSize={100}
                        className="-striped -highlight add-user__table"
                        expanded={this.state.expanded}
                        onExpandedChange={expanded => this.setState({ expanded })}
                    />
                </div>
            </div>
        )
    }
}
export default connect((state, props) => { return { storeData: state } })(Sitemap_UniversalExperience);
