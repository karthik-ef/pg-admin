import React, { Component } from 'react';
import TextBox from '../CustomControls/TextBox';

import * as Constant from '../../utils/constant';
import './SearchByUrl.css';

import * as Path from '../../utils/routepath';
import { connect } from 'react-redux';

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
                        <label htmlFor="inputPassword" className="col-form-label"><strong>{Constant.PAGE_URL}</strong></label>
                        <div>
                            <TextBox
                                setData={window.location.pathname === Path.ExportPgData
                                    ? this.props.storeData._uniqueContentData // distinct page urls for all user markets
                                        .filter(m => this.props.storeData._userMarkets.map(m => { return m.MarketCode }).includes(m.MarketCode))
                                        .map(m => { return m.PageUrl })
                                        .filter((x, i, a) => { return a.indexOf(x) === i }).map(m => { return { name: m } })
                                    : this.props.storeData._uniqueContentData //page urls for selected market
                                        .filter(m => m.MarketCode === this.props.storeData._selectedMarket && m.IsActive)
                                        .map(m => { return { name: m.PageUrl } })}
                                getData={this.getSelectedValue.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state, props) => { return { storeData: state } })(SearchByUrl);
