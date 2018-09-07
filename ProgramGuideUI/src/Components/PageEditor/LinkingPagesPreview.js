import React, { Component } from 'react';
import Table from "react-table";

class LinkingPagesPreview extends Component {

    render() {
        return (
            <Table
                data = {this.props.setLinkingPageData}
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
                            },
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
                                this.props.DeleteRow(rowInfo['original']);
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

export default LinkingPagesPreview;
