import React, { Component } from 'react';
import FilterResult from '../SearchResults/FilterResult';
import * as API from '../../api/SearchResults';
import $ from 'jquery';
import * as ENDPOINT from '../../utils/endpoints';
import * as Generic from '../../utils/generic';
import ReactExport from "react-data-export";

// Excel Declarations
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class ExportPgData extends Component {
    constructor() {
        super();
        this.isVisible = true;
        this.state = { isDataLoaded: false, customize: false };
    }
    componentDidMount() {
        $('#gridRadios1').attr('checked', true);
        API.getAllPageUrls.call(this);
    }

    filterResultData = (value) => {
        if (value.SearchByUrlResult) {
            var uniqueContentData =  this.UniqueContentData;
            this.ReportData = uniqueContentData.filter(m => m.PageUrl === value.SearchByUrlResult);
            Generic.generateExcelReport.call(this);
        }
        else if (value.SearchByTagResult) {
            var uniqueContentData =  this.UniqueContentData;
            var selectedTag = Generic.createSelectedTagArr(value.SearchByTagResult);
            this.ReportData = uniqueContentData.flexFilter(selectedTag.filter(m => m.Values !== '*' &&  m.Values !== '' && m.Field !== 'Duration details'));
            Generic.generateExcelReport.call(this);
        }
        else {
            
        }
        this.setState({ customize: false });
    }

    searchComponentChange(event) {
        if (event.target.value === "Customize") {
            this.setState({ customize: true });
        }
        else {
            this.ReportData = this.UniqueContentData;
            Generic.generateExcelReport.call(this);
            this.setState({ customize: false });
        }
    }

    ExportData() {
        this.refs.FileName.value = '';
        this.isVisible = true;
        this.setState({});
    }

    FileNameOnChange() {
        this.isVisible = this.refs.FileName.value ? false : true;
        this.setState({});
    }

    render() {
        return (
            <div className="itemDiv add-users__wrapper">
                <div className="container">
                    <label for="exampleInputEmail1"><strong>Export options:</strong></label>
                    <br />
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="DownloadAll" onChange={this.searchComponentChange.bind(this)} />
                        <label class="form-check-label" for="gridRadios1">
                            Export data for all available markets
                         </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="Customize" onChange={this.searchComponentChange.bind(this)} />
                        <label class="form-check-label" for="gridRadios2">
                            Customize
                        </label>
                    </div>
                    <br />

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="input-group">
                                <input type="text" className="form-control" ref="FileName" placeholder="Export data file name" onChange={this.FileNameOnChange.bind(this)} />
                                <div class="input-group-append">
                                    <ExcelFile filename={this.refs.FileName ? this.refs.FileName.value : ''} element={<button class="btn btn-primary" type="button" disabled={this.isVisible} onClick={this.ExportData.bind(this)}  >Export</button>}>
                                        <ExcelSheet dataSet={this.ExcelData} name="Result" />
                                    </ExcelFile>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.customize ? <FilterResult setData={this} getFilterResultData={this.filterResultData.bind(this)} /> : ''}
                </div>
            </div>
        );
    }
}

export default ExportPgData;
