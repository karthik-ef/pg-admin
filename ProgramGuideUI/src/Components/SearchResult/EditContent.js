import React, { Component } from 'react';
import $ from 'jquery';
import '../Dashboard/Dashboard.css'
import ExpandIcon from './Plus.png';
import ShrinkIcon from './Minus.png';
import SearchByTag from '../SearchResult/SearchByTag';

class EditContent extends Component {

    constructor() {
        super();
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.state = {
            collapseIcon: ExpandIcon,
            isClosed: false
        }
    }


    componentDidMount() {
        $('#exampleModalLong').modal('show');
        $('.card').on('shown.bs.collapse', function () {
            $(this).find('img').attr("src", ShrinkIcon)
        });

        $('.card').on('hidden.bs.collapse', function () {
            $(this).find('img').attr("src", ExpandIcon)
        });
    }

    handleCloseClick() {
        this.setState({ isClosed: true });
    }

    render() {

        this.props.callbackFromEditContent(this.state.isClosed)
        return (
            <div>
                <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <strong> URL: {this.props.PageUrl} </strong>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCloseClick}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="accordion" id="accordionExample">

                                    <div class="card">
                                        <div class="card-header" id="headingOne">
                                            <p data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> <strong >
                                                Page Tag section   <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>

                                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div class="card-body">
                                            <SearchByTag/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card">
                                        <div class="card-header" id="headingTwo">
                                            <p data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo"> <strong >
                                                Parent Page URL & Family tree   <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>

                                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <div class="card-body">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingThree">
                                            <p data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree"> <strong >
                                                Meta Information  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>

                                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                            <div class="card-body">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingFour">
                                            <p data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour"> <strong >
                                                Page Content <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>
                                        <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                            <div class="card-body">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingFive">
                                            <p data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive"> <strong >
                                                Drill down  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>
                                        <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                                            <div class="card-body">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingSix">
                                            <p data-toggle="collapse" data-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix"> <strong >
                                                Banner Image  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>
                                        <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                                            <div class="card-body">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingSeven">
                                            <div class="form-check form-check-inline">
                                                <label class="form-check-label" for="inlineCheckbox2"><strong>Active</strong></label>
                                                <input type="checkbox" id="activeCheckBox" class="form-check-input" id="exampleCheck1" checked />
                                            </div>
                                            <br />
                                            <label class="form-check-label" for="inlineCheckbox2"><strong>Redirected Page:</strong></label>
                                            <input type="text" class="form-control"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary">Cancel</button>
                                <button type="button" class="btn btn-primary">Save and Publish</button>
                                <button type="button" class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditContent;
