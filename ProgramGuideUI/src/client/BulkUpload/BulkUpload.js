import React, { Component } from 'react';
import readXlsxFile from 'read-excel-file';
import jsonxml from 'jsontoxml';
import $ from 'jquery';

import './styles.css';
import * as Constant from '../../utils/constant';
import * as API from '../../server/api_BulkUpload';

class BulkUpload extends Component {
  constructor() {
    super()
    this.state = {
      fileName: Constant.NO_FILE_CHOSEN,
      bulkUploadDetailsData: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  validateXml(data) {
    return data.replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  }

  componentDidMount() {
    API.getBulkUploadDetails.call(this);
  }

  handleChange(e) {
    const path = e.target.value;
    const formattedFileName = path.replace(/^.*\\/, "");
    this.setState({
      fileName: formattedFileName
    });
  }

  uploadExcelData() {
    var file = document.getElementById("file-upload").files[0];
    readXlsxFile(file, { sheet: 1 }).then((data) => {
      console.log(data);
      var excelContent = [];
      this.validationFailed = false;
      console.log(JSON.stringify(Constant.EXPORT_TO_EXCEL_COLUMNS.toLocaleString().toUpperCase().split(',')));
      console.log(JSON.stringify(data[0].toLocaleString().toUpperCase().split(',')));
      if (JSON.stringify(Constant.EXPORT_TO_EXCEL_COLUMNS.toLocaleString().toUpperCase().split(',')) === JSON.stringify(data[0].toLocaleString().toUpperCase().split(','))) {
        data.forEach((element, index) => {
          //First iteration contains column header
          if (index !== 0) {
            //Perform validation on the uploaded data
            var formatedContent = [];
            element.forEach((content, i) => {
              if (i === 0 || i === 31) {
                if (isNaN(content)) {
                  this.validationFailed = true;
                  alert(Constant.EXPORT_TO_EXCEL_COLUMNS[i] + ' column should contain numeric value. Please correct and upload again');
                }
              }
              else {
                content = content !== null ? this.validateXml(content) : content;
              }
              formatedContent.push(content)
            });
            //Construct key value pair
            excelContent.push({
              UniqueContent: formatedContent.reduce(function (result, field, index) {
                result[Constant.EXPORT_TO_EXCEL_COLUMNS[index]] = field;
                return result;
              }, {})
            });
          }

        });

        console.log(excelContent);
        if (this.validationFailed) return;

        this.UpdatedUniqueContentId = '<BatchDetails xmlns="">' + excelContent.map(m => { return '<BatchRow UniqueContent_ID="' + m.UniqueContent['UniqueContent_ID'] + '"/>' }).toString().replace(/,/g, ' ') + '</BatchDetails>'

        this.BulkUploadDetails = {};

        this.BulkUploadDetails.xmlData = this.UpdatedUniqueContentId;
        this.BulkUploadDetails.userName = JSON.parse(localStorage.getItem('Login'))['UserName'];

        var xml = jsonxml({

          XmlDocument: excelContent
        })

        this.uploadExcelDetails = {};
        this.uploadExcelDetails.userName = JSON.parse(localStorage.getItem('Login'))['UserName'];
        this.uploadExcelDetails.userRole = JSON.parse(localStorage.getItem('Login'))['Roles']['RoleName'];
        this.uploadExcelDetails.xmlData = xml.toString();
        console.log(this.uploadExcelDetails);
        // this.BulkUpload();
        API.uploadExcelData.call(this);


      }
      else {
        alert('Error! Header names of the uploaded file is either incorrect or missing or not in the expected sequence.')
      }
    });
  }

  render() {

    return (
      <div className="bulk-upload__wrapper">
        <div className="container">
          <h3>{Constant.LABEL_CHOOSE_UPLOAD_FILE}</h3>
          <div className="custom-button__wrapper">
            <label className="custom-file-upload">
              <input type="file" id="file-upload"
                onChange={this.handleChange}
              />
              {Constant.LABEL_CHOOSE_FILE}
            </label>
            <span id="file-selected" >{this.state.fileName}</span>
          </div>
          <input type="submit" value="Upload" onClick={this.uploadExcelData.bind(this)} id="tnSubmit" className={`btn btn-primary btn-modal ${this.state.fileName === Constant.NO_FILE_CHOSEN ? '-disabled' : ''} `} />
        </div>
        <br />
        {this.state.bulkUploadDetailsData.length > 0 ?
          <table className="table table-borderless" id="bulkUploadBatchDetails">
            <p><b>Batches not published to LIVE</b></p>
                {this.state.bulkUploadDetailsData}
          </table>
          : ''
        }
      </div>
    );
  }
}

export default BulkUpload;
