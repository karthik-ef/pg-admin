import React, { Component } from 'react';
import TextBox from '../CustomTextBox';

class SearchByUrl extends Component {

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
                        <TextBox PageUrl = {PageUrl}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchByUrl;
