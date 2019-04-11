import React, { Component } from 'react';
import SearchByTag from '../SearchResults/SearchByTag';
import Down from './DownIcon.png';
import { connect } from 'react-redux';

class SuggestedKeywords extends Component {

    render() {
        const keywords = this.props.storeData._suggestedKeywords.filter(m => m.MappedPage_UniqueContent_ID === this.props.UniqueContent_ID);
        return (
            <div class="card">
                <div class="card-header" id="SuggestedKeywordsSection">
                    <p data-toggle="collapse" data-target="#collapseSuggestedKeywordsSection" aria-expanded="true" aria-controls="collapseSuggestedKeywordsSection"> <strong >
                        Suggested Keywords   <span className="floatLeft"> <img src={Down} alt="Expand" className="down__icon" /></span>
                    </strong></p>
                </div>

                <div id="collapseSuggestedKeywordsSection" class="collapse" aria-labelledby="SuggestedKeywordsSection" data-parent="#SuggestedKeywordsSection">
                    <div class="card-body">
                        {keywords.length
                            ? <ul class="list-group">
                                {keywords.map(m => {
                                    return <li class="list-group-item d-flex justify-content-between align-items-center">
                                        {m.Keyword}
                                        <span class="badge badge-primary badge-pill">{m.PotentialMediaValue}</span>
                                    </li>
                                })}
                            </ul>
                            : <div class="alert alert-danger" role="alert">
                                <p> No Keywords were returned for the page!</p>
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state, props) => { return { storeData: state } })(SuggestedKeywords);
