import React, { Component } from 'react';
import ExpandIcon from '../Icons/Plus.png';
import ShrinkIcon from '../Icons/Minus.png';
import $ from 'jquery';

class PageStatus extends Component {

    // Pass MetaInformation data to parent component 
    onChange() {
        this.props.getPageStatusData($('#IsActive').is(':checked'));
    }

    render() {
        return (
            <div class="card">
                <div class="card-header" id="PageStatus">
                    <div class="form-check form-check-inline">
                        <label class="form-check-label"><strong>Active</strong></label>
                        <input type="checkbox" id="activeCheckBox" class="form-check-input" id="IsActive" defaultChecked={this.props.setPageStatusData} onChange={this.onChange.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PageStatus;
