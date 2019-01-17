import React, { Component } from 'react';

import Down from './DownIcon.png';

let FamilyTreeHierarchy = [];
let ParentPageUrl = '';
let ParentPageID = 0;

class ParentPage extends Component {

    constructor() {
        super();
        this.FamilyTreeHierarchy = [];
        this.ParentPageUrl = '';
        this.ParentPageID = 0;
        this.state = {
            showFamilyTree: false
        }
    }

    onChange() {
        this.props.getParentPageData( Number(this.props.UniqueContentData.filter(m => m.PageUrl === this.refs.ParentPageUrl.value).map(m => m.UniqueContent_ID)));
    }

    // Get ParentPageURL and generate Family Hierarchy
    FamilyTree() {
        this.FamilyTreeHierarchy = [];
        this.ParentPageUrl = this.refs.ParentPageUrl.value;
        this.ParentPageID = Number(this.props.UniqueContentData.filter(m => m.PageUrl === this.ParentPageUrl).map(m => m.ParentPageID));
        this.createFamilyTreeHierarchy(this.ParentPageID);
        this.setState({ showFamilyTree: true });
    }

    // Recursive Function to genertate FamilyTree for the PageURL
    createFamilyTreeHierarchy(ParentPageID) {
        let filteredContentData = this.props.UniqueContentData.filter(m => m.UniqueContent_ID === Number(ParentPageID));
        if (filteredContentData.length > 0) {
            this.FamilyTreeHierarchy.push(filteredContentData.map(m => {
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
                        Parent Page URL & Family tree   <span className="floatLeft"> <img src={Down} alt="Logo" /></span>
                    </strong></p>
                </div>

                <div id="collapseParentPage" class="collapse" aria-labelledby="ParentPage" data-parent="#pageEditorSection">
                    <div class="card-body">
                        <strong> Parent Page URL: </strong>
                        <br />
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control parent__page-url" id="txtPparentPageUrl" ref="ParentPageUrl" onChange={this.onChange.bind(this)}
                                        defaultValue={this.props.UniqueContentData.filter(m => m.UniqueContent_ID === this.props.setParentPageData).map(m => m.PageUrl)} required />
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary btn-modal" type="submit" onClick={this.FamilyTree.bind(this)}>Show Family Tree</button>
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
                                        {this.FamilyTreeHierarchy.length > 0 ? this.FamilyTreeHierarchy.reverse() : ''}
                                        {this.FamilyTreeHierarchy.length > 0 ? <li class="breadcrumb-item active" aria-current="page">{this.ParentPageUrl} </li> : 'No Parent'}
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
