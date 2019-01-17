import React, { Component } from 'react';
import SearchByTag from '../SearchResults/SearchByTag';
import Down from './DownIcon.png';

class PageTagSection extends Component {

    //SearchByTag drop down value change event
    getSearchByTagValue = (values) => {
        this.props.SelectedValue(values);
    }

    render() {
        return (
            <div class="card">
                <div class="card-header" id="PageTagSection">
                    <p data-toggle="collapse" data-target="#collapsePageTagSection" aria-expanded="true" aria-controls="collapsePageTagSection"> <strong >
                        Page Tag section   <span className="floatLeft"> <img src={Down} alt="Expand" className="down__icon"/></span>
                    </strong></p>
                </div>

                <div id="collapsePageTagSection" class="collapse" aria-labelledby="PageTagSection" data-parent="#pageEditorSection">
                    <div class="card-body">
                        <SearchByTag getSearchByTagData={this.getSearchByTagValue} ValueFromDb={this.props.data} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PageTagSection;
