import React, { Component } from 'react';
import ExpandIcon from '../Icons/Plus.png';
import ShrinkIcon from '../Icons/Minus.png';

let objDrillDown = {}

class DrillDown extends Component {

    // Pass MetaInformation data to parent component 
    onChange() {
        objDrillDown.FeaturePageTag1 = this.refs.FeaturePageTag1.value;
        objDrillDown.FeaturePageTag2 = this.refs.FeaturePageTag2.value;
        this.props.getDrillDownData(objDrillDown);
    }

    CustomizedTag(e, a) {
        // this.setState({ FeatureTagType: e })
        // $('#exampleModalLong').modal('hide');
        // $('#anotherModal').modal('show');
    }

    render() {
        return (
            <div class="card">
                <div class="card-header" id="DrillDown">
                    <p data-toggle="collapse" data-target="#collapseDrillDown" aria-expanded="true" aria-controls="collapseDrillDown"> <strong >
                        Drill down  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                    </strong></p>
                </div>

                <div id="collapseDrillDown" class="collapse" aria-labelledby="DrillDown" data-parent="#accordionExample">
                    <div class="card-body">
                        {/* Feature Tag 1 Content */}
                        <strong> Feature Tag Page 1: </strong>
                        <br />
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control input-sm" id="txtFeaturePageTag1" defaultValue={this.props.setDrillDownData['FeaturePageTag1']} ref="FeaturePageTag1" onChange={this.onChange.bind(this)} />
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary btn-sm" type="submit" onClick={this.CustomizedTag.bind(this, 'Feature Page Tag 1')}>Preview</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <br />
                        {/* Feature Tag 2 Content */}
                        <strong> Feature Tag Page 2: </strong>
                        <br />
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control input-sm" id="txtFeaturePageTag2" defaultValue={this.props.setDrillDownData['FeaturePageTag2']} ref="FeaturePageTag2" onChange={this.onChange.bind(this)}/>
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary btn-sm" type="submit" onClick={this.CustomizedTag.bind(this, 'Feature Page Tag 2')}>Preview</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <br />
                        {/* Feature Tag 2 Content */}
                        <strong> Feature Tag Page 3: </strong>
                        <br />
                        <button class="btn btn-primary btn-sm" type="submit" onClick={this.CustomizedTag.bind(this, 'Feature Page Tag 3')}>Show Customized Tags</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DrillDown;
