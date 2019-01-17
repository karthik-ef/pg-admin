import React, { Component } from 'react';
import TextBox from '../CustomControls/TextBox';

import * as Constant from '../../utils/constant';
import './SearchByUrl.css';

class SearchByUrl extends Component {

    getSelectedValue(value) {
        this.props.getSearchByUrlData(value)
    }

    render() {
        return (
            <div className="url__search">
                <p>{Constant.SEARCH_URL_HEADER}</p>

                <div className="form-group row">
                    <div className="search__wrapper">
                        <label for="inputPassword" className="col-form-label"><strong>{Constant.PAGE_URL}</strong></label>
                        <div>
                            <TextBox setData = {this.props.setPageUrlData} getData ={this.getSelectedValue.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchByUrl;
