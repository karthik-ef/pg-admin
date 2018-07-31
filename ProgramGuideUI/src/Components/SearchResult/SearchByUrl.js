import React, { Component } from 'react';

class SearchByUrl extends Component {

    render() {

        return (
            <div >
                <strong>If you know the URL of the page, please enter below</strong>
                <br />
                <br />

                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label"><strong>Page URL:</strong></label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputPassword" placeholder="Enter page URL" />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchByUrl;
