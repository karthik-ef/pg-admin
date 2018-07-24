import React, { Component } from 'react';
import './Dashboard.css';
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Header from './Header';
import FilterResult from '../SearchResult/FilterResult'

class Dashboard extends Component {

    render() {
        return (
            <div className="mainDiv">

                <Header />

                {/* Display Application Name */}
                {/* <div className="applicationNameDiv">Program Guide 2.0<br />Ef Techno</div> */}
                {/* Display Content */}
                <div className="contentDiv">
                    <div className="itemDiv">
                        <table class="table table-hover">
                            < thead>
                                <tr>
                                    <th scope="col">
                                        <select class="form-control" id="exampleFormControlSelect1">
                                            <option value="select">Select Market</option>
                                            <option value="select">DE</option>
                                        </select>
                                    </th>
                                    {/* <th scope="col"><button type="button" class="btn btn-secondary">Filter By URL</button></th> */}
                                    <th scope="col"><button type="button" class="btn btn-secondary">Filter Results</button></th>
                                    <th scope="col"><button type="button" class="btn btn-secondary">Export to Excel</button></th>
                                </tr>
                            </thead>
                        </table>
                        <table class="table table-hover">

                            <div class="list-group">
                                <ul class="list-group">
                                    <li class="list-group-item list-group-item-dark">Page URL <span className="floatLeft"><Link to="/FilterResult" class="nav-link">Filter</Link></span></li>
                                </ul>


                                <a href="#" class="list-group-item list-group-item-action list-group-item-light">/pg/auslandsaufenthalt/australien/brisbane/<span className="floatLeft">Edit</span></a>
                                <a href="#" class="list-group-item list-group-item-action list-group-item-light">/pg/auslandsaufenthalt/england/<span className="floatLeft">Edit</span></a>
                                <a href="#" class="list-group-item list-group-item-action list-group-item-light">/pg/auslandsaufenthalt/england/bristol/<span className="floatLeft">Edit</span></a>
                                <a href="#" class="list-group-item list-group-item-action list-group-item-light">/pg/auslandsaufenthalt/australien/brisbane/<span className="floatLeft">Edit</span></a>
                                <a href="#" class="list-group-item list-group-item-action list-group-item-light">/pg/auslandsaufenthalt/england/<span className="floatLeft">Edit</span></a>
                                <a href="#" class="list-group-item list-group-item-action list-group-item-light">/pg/auslandsaufenthalt/england/bristol/<span className="floatLeft">Edit</span></a>
                                <a href="#" class="list-group-item list-group-item-action list-group-item-light">/pg/auslandsaufenthalt/australien/brisbane/<span className="floatLeft">Edit</span></a>
                                <a href="#" class="list-group-item list-group-item-action list-group-item-light">/pg/auslandsaufenthalt/england/bristol/<span className="floatLeft">Edit</span></a>

                            </div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-end">
                                    <li class="page-item disabled">
                                        <a class="page-link" href="#" tabindex="-1">Previous</a>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item">
                                        <a class="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </table>
                    </div>
                </div>
                <Switch>
                    <Route path="/FilterResult" exact component={FilterResult} />
                </Switch>;
                {/* Display Footer */}
                <div className="footerDiv">
                    Copyright © EF Education First Ltd. All Rights Reserved.
                </div>
            </div>
        );
    }
}

export default Dashboard;