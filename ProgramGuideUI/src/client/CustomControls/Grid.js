import React, { Component } from 'react';
import Table from "react-table";
import DeleteIcon from '../Icons/Delete.png';

class Grid extends Component {

    render() {
        return (
            <Table
                data={this.props.setData}
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

                defaultPageSize={10}
                showPageSizeOptions={false}
                showPageJump={false}
                className="-striped -highlight"
            />
        );
    }
}

export default Grid;
