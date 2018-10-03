import React, { Component } from 'react';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import $ from 'jquery';
import Tree from '../CustomControls/TreeView';
class BannerImagePreview extends Component {

    constructor() {
        super();
        this.bannerImagePath = '';
        this.state = {
            imageData: [],
            isFilter: false
        };
    }

    componentDidMount() {
        $('#bannerImage').modal('show');
    }

    setImagePath(){
        this.props.setImagePath(this.bannerImagePath);
        $('#bannerImage').modal('hide');
    }

    onPick(image){
        console.log(image['src']);
        var img = image['src'].toString();
        console.log( img.substring(img.indexOf("/universal")));
        this.bannerImagePath = img.substring(img.indexOf("/universal"));
    }

    handleCloseClick(){
        $('#bannerImage').modal('hide');
        this.props.ModalClosed(true);
    }

    Filter = (value) => {
        this.setState({isFilter: true, imageData: this.props.data.filter(m => m.includes(value.value))})
    }


    render() {

        this.state.isFilter ? '' : this.state.imageData = this.props.data;
        let treeStructure = this.props.treeData;

        console.log(treeStructure);
        return (
            <div class="modal hide fade" id="bannerImage" tabindex="-1" role="dialog" aria-labelledby="bannerImageTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" aria-label="Close" onClick={this.handleCloseClick.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id="bannerImageModalBody">
                        <div id = 'left'>
                        <Tree setData = {treeStructure} CallBack = {this.Filter.bind(this)}/>
                        </div>
                        <div id='right'>
                        <ImagePicker
                                    images={this.state.imageData.map((image,i) => ({ src: image, value: i }))}
                                    onPick={this.onPick.bind(this)}
                                />
                        </div>
                            <div id="ImagePicker">
                                
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-primary" onClick = {this.setImagePath.bind(this)}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BannerImagePreview;
