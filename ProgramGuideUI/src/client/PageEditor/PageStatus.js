import React, { Component } from 'react';
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
                    <div class="form-check form-check-inline custom-checkbox">
                        <input type="checkbox" id="activeCheckBox" class="form-check-input custom-control-input" id="IsActive" defaultChecked={this.props.setPageStatusData} onChange={this.onChange.bind(this)} />
                        <label class="form-check-label custom-control-label" for="IsActive"><strong>Active</strong></label>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageStatus;
