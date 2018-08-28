import React, { Component } from 'react';
import ExpandIcon from '../Icons/Plus.png';
import ShrinkIcon from '../Icons/Minus.png';

let FamilyTreeHierarchy = [];
let ParentPageUrl = '';
let ParentPageID = 0;

class ParentPage extends Component {

    constructor(){
        super();
        this.state = {
            showFamilyTree: false
        }
    }

    // Get ParentPageURL and generate Family Hierarchy
    FamilyTree() {
        FamilyTreeHierarchy = [];
        ParentPageUrl = this.refs.ParentPageUrl.value;
        ParentPageID = Number(this.props.getParentPageData.filter(m => m.PageUrl === ParentPageUrl).map(m => m.ParentPageID));
        this.createFamilyTreeHierarchy(ParentPageID);
        this.setState({ showFamilyTree: true });
    }

    // Recursive Function to genertate FamilyTree for the PageURL
    createFamilyTreeHierarchy(ParentPageID) {
        let filteredContentData = this.props.getParentPageData.filter(m => m.UniqueContent_ID === Number(ParentPageID));
        if (filteredContentData.length > 0) {
            FamilyTreeHierarchy.push(filteredContentData.map(m => {
                return <li class="breadcrumb-item"><a href="#">{m.PageUrl}</a></li>
            }))
            this.createFamilyTreeHierarchy(filteredContentData.map(m => m.ParentPageID));
        }
    }

    render() {
        return (
            <div class="card">
                <div class="card-header" id="ParentPage">
                    <p data-toggle="collapse" data-target="#collapseParentPage" aria-expanded="true" aria-controls="collapseParentPage"> <strong >
                        Parent Page URL & Family tree   <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                    </strong></p>
                </div>

                <div id="collapseParentPage" class="collapse" aria-labelledby="ParentPage" data-parent="#accordionExample">
                    <div class="card-body">
                        <strong> Parent Page URL: </strong>
                        <br />
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control input-sm" id="txtPparentPageUrl" ref="ParentPageUrl"
                                        defaultValue={this.props.getParentPageData.filter(m => m.UniqueContent_ID === this.props.currentParentPageID).map(m => m.PageUrl)} required />
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary btn-sm" type="submit" onClick={this.FamilyTree.bind(this)}>Show Family Tree</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <br />
                        {this.state.showFamilyTree ?
                        <div>
                            <strong> Family Tree: </strong>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    {FamilyTreeHierarchy.length > 0 ? FamilyTreeHierarchy.reverse() : ''}
                                    {FamilyTreeHierarchy.length > 0 ? <li class="breadcrumb-item active" aria-current="page">{ParentPageUrl} </li> : 'No Parent'}
                                </ol>
                            </nav>
                        </div>
                        : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default ParentPage;
