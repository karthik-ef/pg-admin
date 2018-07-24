import React, { Component } from 'react';
import $ from 'jquery';
import FilterCriteria from './FilterCriteria';


class FilterResult extends Component {

    constructor() {
        super();
        
        this.state = {
          selectedValue: 'Search By URL'
        };
        this.handleClick = this.handleClick.bind(this);
      }

    componentDidMount() {
        $('#exampleModalLong').modal('show');
        $('#defaultInline1').attr('checked', true);
    }

    handleClick(event){
       this.setState({
        selectedValue: event.target.value
      });
    }

    render() {

        return (
            <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <br/>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="defaultInline1" name="inlineDefaultRadiosExample" value="Search By URL" onChange={this.handleClick}   />
                                <label class="custom-control-label" for="defaultInline1">Search By URL</label>
                            </div>

                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="defaultInline2" name="inlineDefaultRadiosExample"  value="Search By Tag" onChange={this.handleClick}   />
                                <label class="custom-control-label" for="defaultInline2">Search By Tag</label>
                            </div>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <FilterCriteria FilterCriteria = {this.state.selectedValue} />
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

export default FilterResult;
