import React, { Component } from 'react';
import Table from "react-table";
import $ from 'jquery';
import * as API from '../../api/ContentEditor';

class DrilldownAlias extends Component {

    constructor() {
        super();
        this.data = []
        this.drillDownAliasData = []
        this.state = {
            showPreviewData: false
        }
        this.renderEditable = this.renderEditable.bind(this);
    }

    componentDidMount() {
        API.getDrillDownAliasDetails.call(this);
        //this.getDrillDownAlias();
    }

    previewData = (value) => {

    }

    addDrillDownAliasData = (value) => {

        if (this.refs.DrilldownAlias.value !== '' && this.refs.AnchorText.value !== ''
            && this.drillDownAliasData.filter(m => m.DrilldownAlias === this.refs.DrilldownAlias.value).length === 0) {

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

    removeDrillDownAliasData = (value) => {
        this.drillDownAliasData = this.drillDownAliasData.filter(m => m.DrilldownAlias !== value["DrilldownAlias"]);
        this.objDrillDownXML = this.drillDownAliasData.map(m => { return '<Tags DrillDownAlias="' + m.DrilldownAlias + '" AnchorText = "' + m.AnchorText + '" />' }).toString().replace(/,/g, ' ');
        this.setState({ showPreviewData: false });
        this.props.getDrillDownAliasData(this.objDrillDownXML);
    }

    renderEditable(cellInfo) {
        return (
            <div
                style={{ backgroundColor: "#", height: '100%' }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    if (this.drillDownAliasData[cellInfo.index][cellInfo.column.id] !== e.target.innerHTML && this.drillDownAliasData.filter(m => m.DrilldownAlias === e.target.innerHTML).length > 0) {
                        alert('Drilldown tag already exist');
                        e.target.innerHTML = this.drillDownAliasData[cellInfo.index][cellInfo.column.id];
                    }
                    else {
                        const data = this.drillDownAliasData;
                        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        this.objDrillDownXML = this.drillDownAliasData.map(m => { return '<Tags DrillDownAlias="' + m.DrilldownAlias + '" AnchorText = "' + m.AnchorText + '" />' }).toString().replace(/,/g, ' ');
                        this.props.getDrillDownAliasData(this.objDrillDownXML);
                        this.setState({ data });
                    }
                }}
                dangerouslySetInnerHTML={{
                    __html: this.drillDownAliasData[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
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
                                        id: "DrilldownAlias",
                                        accessor: d => d.DrilldownAlias,
                                        sortable: false,
                                        Cell: this.renderEditable
                                    },
                                    {
                                        Header: <strong>Anchor Text</strong>,
                                        id: "AnchorText",
                                        accessor: d => d.AnchorText,
                                        sortable: false,
                                        Cell: this.renderEditable
                                    },
                                    {
                                        Header: '',
                                        sortable: false,
                                        width: 80,
                                        Cell: row => (
                                            <button className="btn btn-danger btn-sm" type="submit" >Remove</button>
                                        )
                                    }
                                ]
                            }
                        ]}
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                                onClick: (e, handleOriginal) => {
                                    console.log(column);
                                    console.log(e);
                                    if (column['Header']['props'] === undefined) {
                                        this.removeDrillDownAliasData(rowInfo['original']);
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
                <div className="row">
                    <div className="col-sm-12">
                        <div className="input-group">
                            <input type="text" className="form-control" id="txtDrillDownAlias" ref="DrilldownAlias" />
                            <input type="text" className="form-control input-sm" id="txtAnchorText" placeholder="Anchor Text" ref="AnchorText" />
                            <span className="input-group-btn">
                                {/* <button id="DrillDownAliasPreview" class="btn btn-primary btn-modal" type="submit" onClick={this.previewData.bind(this)} >Preview</button> */}
                                <button id="AnchorText" className="btn btn-primary btn-modal" type="submit" onClick={this.addDrillDownAliasData.bind(this)}> Add </button>
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
