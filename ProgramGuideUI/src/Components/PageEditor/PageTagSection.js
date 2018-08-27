import React, { Component } from 'react';
import ExpandIcon from '../Icons/Plus.png';
import ShrinkIcon from '../Icons/Minus.png';
import SearchByTag from '../SearchResult/SearchByTag';

class PageTagSection extends Component {

    //SearchByTag drop down value change event
    getSearchByTagValues = (values) => {
        this.props.SelectedValue(values);
    }

    render() {
        return (
            <div class="card">
                <div class="card-header" id="PageTagSection">
                    <p data-toggle="collapse" data-target="#collapsePageTagSection" aria-expanded="true" aria-controls="collapsePageTagSection"> <strong >
                        Page Tag section   <span className="floatLeft"> <img src={ExpandIcon} alt="Expand" /></span>
                    </strong></p>
                </div>

                <div id="collapsePageTagSection" class="collapse" aria-labelledby="PageTagSection" data-parent="#accordionExample">
                    <div class="card-body">
                        <SearchByTag SearchByTagValues={this.getSearchByTagValues} ValueFromDb={this.props.data} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PageTagSection;
