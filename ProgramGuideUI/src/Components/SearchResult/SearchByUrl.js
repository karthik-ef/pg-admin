import React, { Component } from 'react';
import TextBox from '../CustomTextBox';

class SearchByUrl extends Component {

    constructor() {
        super();
        this.state = {
            pageUrl: ''
        }
    }

    getSelectedValue(value) {
        this.setState({ pageUrl: value },function(){this.props.EnteredPageUrl(this.state.pageUrl)});
    }

    render() {
        let PageUrl = this.props.PageUrl
        return (
            <div >
                <strong>If you know the URL of the page, please enter below</strong>
                <br />
                <br />

                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label"><strong>Page URL:</strong></label>
                    <div class="col-sm-10">
                        {/* <input type="text" class="form-control" id="inputPassword" placeholder="Enter page URL" /> */}
                        <TextBox PageUrl={PageUrl} selectedValue={this.getSelectedValue.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchByUrl;
