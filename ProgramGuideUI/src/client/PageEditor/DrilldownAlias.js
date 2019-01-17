import React, { Component } from 'react';
import Table from "react-table";
import $ from 'jquery';

class DrilldownAlias extends Component {

    constructor() {
        super();
        this.data = []
        this.drillDownAliasData = []
        this.state = {
            showPreviewData: false
        }
    }

    componentDidMount(){
        this.getDrillDownAlias();
    }

    previewData = (value) => {

    }

    getDrillDownAlias(){
        $.ajax({
            url: 'http://ctdev.ef.com:3000/getDrillDownAlias/?UniqueContent_ID=' + this.props.setData,
            type: 'GET',
            cache: false,
            success: function (data) {
                this.drillDownAliasData = data
                this.setState({showPreviewData: false});
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    addDrillDownAliasData = (value) => {

        if (this.refs.DrilldownAlias.value !== '' && this.refs.AnchorText.value !== ''
            && this.drillDownAliasData.filter(m => m.AnchorText === this.refs.AnchorText.value).length === 0) {

            this.drillDownAliasData.push({ DrilldownAlias: this.refs.DrilldownAlias.value, AnchorText: this.refs.AnchorText.value });
            this.setState({ showPreviewData: false });

            this.objDrillDownXML = this.drillDownAliasData.map(m => { return '<Tags DrillDownAlias="' + m.DrilldownAlias + '" AnchorText = "' + m.AnchorText + '" />' }).toString().replace(/,/g, ' ');
            console.log(this.objDrillDownXML);

            console.log(this.refs.DrilldownAlias.value);
            console.log(this.refs.AnchorText.value);

            this.refs.DrilldownAlias.value = '';
            this.refs.AnchorText.value = '';

            this.props.getDrillDownAliasData(this.objDrillDownXML);


        }

    }

    render() {
        return (

            <div>
                <strong> Drill Down Alias: </strong>
                <br />

                {this.drillDownAliasData.length > 0 ?
                    <Table
                        data={this.drillDownAliasData}
                        minRows={0}
                        columns={[
                            {
                                columns: [
                                    {
                                        Header: <strong>Drilldown Alias</strong>,
                                        id: "PageUrl",
                                        accessor: d => d.DrilldownAlias,
                                        sortable: false
                                    },
                                    {
                                        Header: <strong>Anchor Text</strong>,
                                        id: "PageTitle",
                                        accessor: d => d.AnchorText,
                                        sortable: false
                                    },
                                    // {
                                    //     Header: '',
                                    //     sortable: false,
                                    //     width: 80,
                                    //     Cell: row => (
                                    //         <button class="btn btn-danger btn-sm" type="submit" >Preview</button>
                                    //     )
                                    // },
                                    {
                                        Header: '',
                                        sortable: false,
                                        width: 80,
                                        Cell: row => (
                                            <button class="btn btn-danger btn-sm" type="submit" >Remove</button>
                                        )
                                    }
                                ]
                            }
                        ]}
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                                onClick: (e, handleOriginal) => {

                                    if (column['Header']['props'] === undefined) {
                                        this.AnchorText = rowInfo['original'].AnchorText;
                                        this.drillDownAliasData = this.drillDownAliasData.filter(m => m.AnchorText !== this.AnchorText)
                                        this.objDrillDownXML = this.drillDownAliasData.map(m => { return '<Tags DrillDownAlias="' + m.DrilldownAlias + '" AnchorText = "' + m.AnchorText + '" />' }).toString().replace(/,/g, ' ');
                                        this.setState({ showPreviewData: false });
                                        this.props.getDrillDownAliasData(this.objDrillDownXML);
                                    }
                                }
                            };
                        }}
                        defaultPageSize={10}
                        showPageSizeOptions={false}
                        showPageJump={false}
                        className="-striped -highlight"
                    />
                    : ''}
                <br />
                <div class="row">
                    <div class="col-sm-12">
                        <div class="input-group">
                            <input type="text" class="form-control" id="txtDrillDownAlias" ref="DrilldownAlias" />
                            <input type="text" class="form-control input-sm" id="txtAnchorText" placeholder="Anchor Text" ref="AnchorText" />
                            <span class="input-group-btn">
                                {/* <button id="DrillDownAliasPreview" class="btn btn-primary btn-modal" type="submit" onClick={this.previewData.bind(this)} >Preview</button> */}
                                <button id="AnchorText" class="btn btn-primary btn-modal" type="submit" onClick={this.addDrillDownAliasData.bind(this)}> Add </button>
                            </span>
                        </div>
                    </div>
                </div>

                <br />

                {this.state.showPreviewData ?

                    <Table
                        // data={[{"PageUrl" : 'sss', "PageTitle" : 'ddd'}]}
                        data={this.state.data}
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
                        showPageSizeOptions={false}
                        showPageJump={false}
                        className="-striped -highlight"
                    />
                    : ''}
            </div>
        );
    }
}

export default DrilldownAlias;
