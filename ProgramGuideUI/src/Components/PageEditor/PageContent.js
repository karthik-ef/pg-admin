import React, { Component } from 'react';
import ExpandIcon from '../Icons/Plus.png';
import ShrinkIcon from '../Icons/Minus.png';
import TextEditor from '../CustomControls/TextEditor';

let objPageContent = {}

class PageContent extends Component {

    constructor(){
        super();
        this.objPageContent = {};
    }

    // TextEditor onChange event
    getRichTextValue = (component, value) => {
        if (component === 'VisibleIntroText') {
            this.objPageContent.VisibleIntroText = value;
        }
        else if (component === 'HiddenIntroText') {
            this.objPageContent.HiddenIntroText = value;
        }
        else if (component === 'ContentText1') {
            this.objPageContent.ContentText1 = value;
        }
        else if (component === 'ContentText2') {
            this.objPageContent.ContentText2 = value;
        }
        this.StorePageContentValue();
    }

    //Textbox onChangeEvent
    onChange(){
        this.objPageContent.PageTitle = this.refs.PageTitle.value;
        this.objPageContent.SubHeader1 = this.refs.SubHeader1.value;
        this.objPageContent.SubHeader2 = this.refs.SubHeader2.value;
        this.objPageContent.BreadcrumbText = this.refs.BreadcrumbText.value;
        this.StorePageContentValue();
    }

    // Store the Modified data 
    StorePageContentValue(){
        this.props.getPageContentData(this.objPageContent);
    }

    render() {
        return (
            <div class="card">
                <div class="card-header" id="PageContent">
                    <p data-toggle="collapse" data-target="#collapsePageContent" aria-expanded="true" aria-controls="collapsePageContent"> <strong >
                        Page Content <span className="floatLeft"> <img src={ExpandIcon} alt="Logo" /></span>
                    </strong></p>
                </div>
                <div id="collapsePageContent" class="collapse" aria-labelledby="PageContent" data-parent="#accordionExample">
                    <div class="card-body">

                        <strong> Page Title: </strong>
                        <br />
                        <input type="text" class="form-control" defaultValue={this.props.setPageContentData['PageTitle']} ref="PageTitle" onChange={this.onChange.bind(this)} />
                        <br />

                        <strong> Visible Intro Text: </strong>
                        <br />
                        <TextEditor defaultValue={this.props.setPageContentData['VisibleIntroText']} getRichTextEditorValue={this.getRichTextValue.bind(this, 'VisibleIntroText')} />
                        <br />

                        <strong> Hidden Intro Text: </strong>
                        <br />
                        <TextEditor defaultValue={this.props.setPageContentData['HiddenIntroText']} getRichTextEditorValue={this.getRichTextValue.bind(this, 'HiddenIntroText')} />
                        <br />

                        <strong> Page Sub Header 1: </strong>
                        <br />
                        <input type="text" class="form-control" defaultValue={this.props.setPageContentData['SubHeader1']} ref="SubHeader1" onChange={this.onChange.bind(this)} />
                        <br />

                        <strong> Page Content Part 1: </strong>
                        <br />
                        <TextEditor defaultValue={this.props.setPageContentData['ContentText1']} getRichTextEditorValue={this.getRichTextValue.bind(this, 'ContentText1')} />
                        <br />

                        <strong> Page Sub Header 2: </strong>
                        <br />
                        <input type="text" class="form-control" defaultValue={this.props.setPageContentData['SubHeader2']} ref="SubHeader2" onChange={this.onChange.bind(this)}/>
                        <br />

                        <strong> Page Content Part 2: </strong>
                        <br />
                        <TextEditor defaultValue={this.props.setPageContentData['ContentText2']} getRichTextEditorValue={this.getRichTextValue.bind(this, 'ContentText2')} />
                        <br />

                        <strong> Breadcrumb Text: </strong>
                        <br />
                        <input type="text" class="form-control" defaultValue={this.props.setPageContentData['BreadcrumbText']} ref="BreadcrumbText" onChange={this.onChange.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PageContent;
