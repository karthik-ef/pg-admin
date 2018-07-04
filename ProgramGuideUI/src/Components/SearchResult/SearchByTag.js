import React, { Component } from 'react';
import $ from 'jquery';
import Dropdown from '../CustomizedDropDown';

class SearchByTag extends Component {
    constructor() {
        super();
        this.state = {
            roles: [],
            markets: []
        }
    }

    getRoles() {
        this.setState({
            roles: [
                { label: 'Admin', value: 'Admin' },
                { label: 'General', value: 'General' }
            ]
        });
    }

    componentDidMount() {
        this.getRoles();
        $(window).on('load', function () {
            $('#exampleModalLong').modal('show');
            // $('.btn').click(function(){
            //     var email = $('#inputEmail3').val();
            //     var password = $('#inputPassword3').val();
            //     if (!(email == 'admin' && password == 'password' )){
            //         $('.alert').show();
            //     }
            //     else{
            //         // $('#exampleModalCenter').modal('hide');
            //        // ReactDOM.render(<Header />, document.getElementById('root'));
            //     }
            // });
        });
    }

    render() {

        return (
            <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Search By Tag</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <strong>Please use the options below to specify one or more tags to start your search</strong>
                            <br />
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                <div class="col-sm-10">
                                    <label for="exampleInputEmail1"><strong>Tag_Experience</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                    <div class="col-sm-8">
                                    <label for="exampleInputEmail1"><strong>Tag_KeywordTopic</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                <div class="col-sm-10">
                                    <label for="exampleInputEmail1"><strong>Tag_When</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                <div class="col-sm-8">
                                    <label for="exampleInputEmail1"><strong>Tag_CourseType</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                <div class="col-sm-10">
                                    <label for="exampleInputEmail1"><strong>Tag_AgeRange</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                <div class="col-sm-8">
                                    <label for="exampleInputEmail1"><strong>Tag_Duration</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                <div class="col-sm-10">
                                    <label for="exampleInputEmail1"><strong>Tag_Language</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                <div class="col-sm-8">
                                    <label for="exampleInputEmail1"><strong>Tag_Platform</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                <div class="col-sm-10">
                                    <label for="exampleInputEmail1"><strong>Tag_Continent</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                <div class="col-sm-8">
                                    <label for="exampleInputEmail1"><strong>Tag_Country</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                <div class="col-sm-10">
                                    <label for="exampleInputEmail1"><strong>Tag_State</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                <div class="col-sm-8">
                                    <label for="exampleInputEmail1"><strong>Tag_City</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                <div class="col-sm-10">
                                    <label for="exampleInputEmail1"><strong>Tag_Feature</strong></label>
                                    <Dropdown Roles={this.state.roles} multiSelect={true} />
                                    </div>
                                </div>
                                <div class="col-md-5 ml-auto">
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchByTag;