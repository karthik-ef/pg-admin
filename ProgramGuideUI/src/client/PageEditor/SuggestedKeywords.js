import React, { Component } from 'react';
import SearchByTag from '../SearchResults/SearchByTag';
import Down from './DownIcon.png';

class SuggestedKeywords extends Component {

    render() {
        return (
            <div class="card">
                <div class="card-header" id="SuggestedKeywordsSection">
                    <p data-toggle="collapse" data-target="#collapseSuggestedKeywordsSection" aria-expanded="true" aria-controls="collapseSuggestedKeywordsSection"> <strong >
                    Suggested Keywords   <span className="floatLeft"> <img src={Down} alt="Expand" className="down__icon" /></span>
                    </strong></p>
                </div>

                <div id="collapseSuggestedKeywordsSection" class="collapse" aria-labelledby="SuggestedKeywordsSection" data-parent="#SuggestedKeywordsSection">
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Cras justo odio
                                <span class="badge badge-primary badge-pill">14</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Dapibus ac facilisis in
                                <span class="badge badge-primary badge-pill">2</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Morbi leo risus
                                <span class="badge badge-primary badge-pill">1</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default SuggestedKeywords;
