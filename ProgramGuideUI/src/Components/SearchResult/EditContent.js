import React, { Component } from 'react';
import $ from 'jquery';
import '../Dashboard/Dashboard.css'
import ExpandIcon from './Plus.png';
import ShrinkIcon from './Minus.png';
import SearchByTag from '../SearchResult/SearchByTag';
import RichTextEditor from '../CustomRichTextEditor';


const ParentPageID = 0;
const EditPage = [];
var ParentPageUrl = '';
const UniqueContentData = [];
const isFamilyTreeVisible = false;
var FamilyTreeHierarchy = [];


class EditContent extends Component {

    constructor() {
        super();
        this.ParentPageID = 0;
        this.ParentPageUrl = '';
        this.EditPage = [];
        this.UniqueContentData = [];
        this.FamilyTreeHierarchy = [];


        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.ShowFamilyTree = this.ShowFamilyTree.bind(this);
        this.getFamilyTreeHierarchy = this.getFamilyTreeHierarchy.bind(this);
        this.state = {
            collapseIcon: ExpandIcon,
            isClosed: false,
            ParentPageID: 0,
        }
    }


    componentDidMount() {

        this.isFamilyTreeVisible = false;
        this.EditPage = this.props.EditPageRow !== undefined ? this.props.EditPageRow['EditRowData'] : [];
        this.UniqueContentData = this.props.EditPageRow !== undefined ? this.props.EditPageRow['UniqueContentData'] : [];

        this.setState({ ParentPageID: 0 });


        $('#exampleModalLong').modal('show');
        $('.card').on('shown.bs.collapse', function () {
            $(this).find('img').attr("src", ShrinkIcon)
        });

        $('.card').on('hidden.bs.collapse', function () {
            $(this).find('img').attr("src", ExpandIcon)
        });
    }

    handleCloseClick() {
        this.setState({ isClosed: true });
    }

    BannerImageTextChange(e) {
        alert(e.target.value);
    }

    ShowFamilyTree() {
        this.FamilyTreeHierarchy = [];
        this.ParentPageUrl = this.refs.ParentPageUrl.value;
        this.ParentPageID = Number(this.UniqueContentData.filter(m => m.PageUrl === this.ParentPageUrl).map(m => m.ParentPageID));
        this.getFamilyTreeHierarchy(this.ParentPageID);
        this.setState({ isFamilyTreeVisible: true });
    }

    getFamilyTreeHierarchy(ParentPageID) {
        let filteredContentData = this.UniqueContentData.filter(m => m.UniqueContent_ID === Number(ParentPageID));
        if (filteredContentData.length > 0) {
            this.FamilyTreeHierarchy.push(filteredContentData.map(m => {
                return <li class="breadcrumb-item"><a href="#">{m.PageUrl}</a></li>
            }))
            this.getFamilyTreeHierarchy(filteredContentData.map(m => m.ParentPageID));
        }
    }

    getSearchByTagValues = (values) => {
        // this.props.SearchByTagValues(values)
    }

    render() {
        const EditPage = this.props.EditPageRow !== undefined ? this.props.EditPageRow['EditRowData'] : [];
        const UniqueContentData = this.props.EditPageRow !== undefined ? this.props.EditPageRow['UniqueContentData'] : [];
        this.props.callbackFromEditContent(this.state.isClosed)
        return (
            <div>
                <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <strong> URL: {EditPage['PageUrl'] === undefined ? this.props.PageUrl : EditPage['PageUrl']} </strong>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCloseClick}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="accordion" id="accordionExample">

                                    <div class="card">
                                        <div class="card-header" id="headingOne">
                                            <p data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> <strong >
                                                Page Tag section   <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>

                                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <SearchByTag SearchByTagValues={this.getSearchByTagValues} ValueFromDb = {EditPage}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card">
                                        <div class="card-header" id="headingTwo">
                                            <p data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo"> <strong >
                                                Parent Page URL & Family tree   <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>

                                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <strong> Parent Page URL: </strong>
                                                <br />
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="input-group input-group-sm">
                                                            <input type="text" class="form-control input-sm" id="search-church" ref="ParentPageUrl"
                                                                defaultValue={UniqueContentData.filter(m => m.UniqueContent_ID === EditPage['ParentPageID']).map(m => m.PageUrl)} required />
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-primary btn-sm" type="submit" onClick={this.ShowFamilyTree}>Show Family Tree</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br />
                                                {this.state.isFamilyTreeVisible ?
                                                    <div>
                                                        <strong> Family Tree: </strong>
                                                        <nav aria-label="breadcrumb">
                                                            <ol class="breadcrumb">
                                                                {this.FamilyTreeHierarchy.length > 0 ? this.FamilyTreeHierarchy.reverse() : ''}
                                                                {this.FamilyTreeHierarchy.length > 0 ? <li class="breadcrumb-item active" aria-current="page">{this.ParentPageUrl} </li> : 'No Parent' }
                                                            </ol>
                                                        </nav>
                                                    </div>
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingThree">
                                            <p data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree"> <strong >
                                                Meta Information  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>

                                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <strong> Meta Title: </strong>
                                                <br />
                                                <input type="text" class="form-control" defaultValue={EditPage['MetaTitle']} />
                                                <br />
                                                <strong> Meta Description: </strong>
                                                <textarea class="form-control" rows="5" defaultValue={EditPage['MetaDescription']}></textarea>
                                                <br />
                                                <strong> Meta Robot: </strong>
                                                <input type="text" class="form-control" readOnly={true} defaultValue={EditPage['MetaRobot']} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingFour">
                                            <p data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour"> <strong >
                                                Page Content <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>
                                        <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <strong> Page Title: </strong>
                                                <br />
                                                <input type="text" class="form-control" defaultValue={EditPage['PageTitle']} />
                                                <br />
                                                <strong> Visible Intro Text: </strong>
                                                <br />
                                                <RichTextEditor />
                                                <br />
                                                <strong> Hidden Intro Text: </strong>
                                                <br />
                                                <RichTextEditor />
                                                <br />
                                                <strong> Page Sub Header 1: </strong>
                                                <br />
                                                <input type="text" class="form-control" defaultValue={EditPage['SubHeader1']} />
                                                <br />
                                                <strong> Page Content Part 1: </strong>
                                                <br />
                                                <RichTextEditor />
                                                <br />
                                                <strong> Page Sub Header 2: </strong>
                                                <br />
                                                <input type="text" class="form-control" defaultValue={EditPage['SubHeader2']} />
                                                <br />
                                                <strong> Page Content Part 2: </strong>
                                                <br />
                                                <RichTextEditor />
                                                <br />
                                                <strong> Breadcrumb Text: </strong>
                                                <br />
                                                <input type="text" class="form-control" defaultValue={EditPage['BreadcrumbText']} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingFive">
                                            <p data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive"> <strong >
                                                Drill down  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>
                                        <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <strong> Feature Tag Page 1: </strong>
                                                <br />
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="input-group input-group-sm">
                                                            <input type="text" class="form-control input-sm" id="search-church" defaultValue={EditPage['FeaturePageTag1']} />
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-primary btn-sm" type="submit">Preview</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Feature Tag 1 Content */}
                                                <br />
                                                <strong> Feature Tag Page 2: </strong>
                                                <br />
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="input-group input-group-sm">
                                                            <input type="text" class="form-control input-sm" id="search-church" defaultValue={EditPage['FeaturePageTag2']} />
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-primary btn-sm" type="submit">Preview</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Feature Tag 2 Content */}
                                                <br />
                                                <strong> Feature Tag Page 3: </strong>
                                                <br />
                                                <button class="btn btn-primary btn-sm" type="submit">Show Customized Tags</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingSix">
                                            <p data-toggle="collapse" data-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix"> <strong >
                                                Banner Image  <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                                            </strong></p>
                                        </div>
                                        <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <strong> Banner Image Path: </strong>
                                                <br />
                                                <input type="text" class="form-control input-sm" defaultValue={EditPage['BannerImage']} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingSeven">
                                            <div class="form-check form-check-inline">
                                                <label class="form-check-label" for="inlineCheckbox2"><strong>Active</strong></label>
                                                <input type="checkbox" id="activeCheckBox" class="form-check-input" id="exampleCheck1" checked />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary">Cancel</button>
                                <button type="button" class="btn btn-primary">Save and Publish</button>
                                <button type="button" class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditContent;
