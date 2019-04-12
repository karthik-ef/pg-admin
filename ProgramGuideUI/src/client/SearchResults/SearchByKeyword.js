import React, { Component } from 'react';
import * as Constant from '../../utils/constant';
import './SearchByUrl.css';
import { connect } from 'react-redux';

class SearchByKeyword extends Component {

    handleOnBlur() {
        this.props.getSearchByKeywordData(this.refs.keyword.value);
    }

    render() {
        return (
            <div className="url__search">
                <p>{Constant.SEARCH_KEYWORD_HEADER}</p>

                <div className="form-group row">
                    <div className="search__wrapper">
                        <label htmlFor="inputPassword" className="col-form-label"><strong>{Constant.KEYWORD}</strong></label>
                        <div>
                            <input type="text" className="form-control create-input" ref="keyword" onBlur={this.handleOnBlur.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state, props) => { return { storeData: state } })(SearchByKeyword);
