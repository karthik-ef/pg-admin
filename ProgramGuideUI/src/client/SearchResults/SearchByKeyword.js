import React, { Component } from 'react';
import TextBox from '../CustomControls/TextBox';

import * as Constant from '../../utils/constant';
import './SearchByUrl.css';

import * as Path from '../../utils/routepath';
import { connect } from 'react-redux';

class SearchByKeyword extends Component {

    getSelectedValue(value) {
        this.props.getSearchByUrlData(value)
    }

    render() {
        return (
            <div className="url__search">
                <p>{Constant.SEARCH_KEYWORD_HEADER}</p>

                <div className="form-group row">
                    <div className="search__wrapper">
                        <label htmlFor="inputPassword" className="col-form-label"><strong>{Constant.KEYWORD}</strong></label>
                        <div>
                            <input type="text" className="form-control create-input" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state, props) => { return { storeData: state } })(SearchByKeyword);
