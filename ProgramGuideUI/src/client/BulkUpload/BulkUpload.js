import React, { Component } from 'react';
import readXlsxFile from 'read-excel-file';
import jsonxml from 'jsontoxml';

import './styles.css';
import * as Constant from '../../utils/constant';
import * as API from '../../api/BulkUpload';
import { connect } from 'react-redux';

class BulkUpload extends Component {
  constructor() {
    super();
    this.state = {
      fileName: Constant.NO_FILE_CHOSEN,
      bulkUploadDetailsData: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    API.getBulkUploadDetails.call(this);
  }

  validateXml(data) {
    // console.log(data);
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

  handleChange(e) {
    const path = e.target.value;
    const formattedFileName = path.replace(/^.*\\/, "");
    this.setState({
      fileName: formattedFileName
    });
  }

  uploadExcelData() {

    Array.prototype.diff = function (a) {
      return this.filter(function (i) { return a.indexOf(i) < 0; });
    };

    var file = document.getElementById("file-upload").files[0];
    readXlsxFile(file, { sheet: 1 }).then((data) => {
      var excelContent = [];
      this.uploadedMarketsList = [];
      this.validationFailed = false;
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
                  alert(Constant.EXPORT_TO_EXCEL_COLUMNS[i] + ' column should contain numeric value for ' + element[2] +' page. Please correct and upload again.');
                }
              }
              else {
                content = content !== null ? this.validateXml(content) : content;
              }

              i === 1
                ? this.uploadedMarketsList.push({ MarketCode: content })
                : ''
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

        if (this.validationFailed) return;

        this.UpdatedUniqueContentId = '<BatchDetails xmlns="">' + excelContent.map(m => { return '<BatchRow UniqueContent_ID="' + m.UniqueContent['UniqueContent_ID'] + '"/>' }).toString().replace(/,/g, ' ') + '</BatchDetails>'
        this.BulkUploadDetails = {
          xmlData: this.UpdatedUniqueContentId,
          userName: this.props.storeData._loginDetails.userName
        };

        var xml = jsonxml({ XmlDocument: excelContent });

        this.uploadExcelDetails = {};
        this.uploadExcelDetails.userName = this.props.storeData._loginDetails.userName;
        this.uploadExcelDetails.userRole = this.props.storeData._loginDetails.roleName;
        this.uploadExcelDetails.xmlData = xml.toString();
        API.BulkUpload.call(this);
      }
      else {

        var missingColumn = Constant.EXPORT_TO_EXCEL_COLUMNS.diff(data[0])
        var errorMessage = missingColumn.length === 1
          ? ' column is missing from the uploaded excel file. Please correct and upload again.'
          : ' columns are missing from the uploaded excel file. Please correct and upload again.';
        if (missingColumn.length) {
          alert(missingColumn + errorMessage);
        }

        else {
          for (var i = 0; i < Constant.EXPORT_TO_EXCEL_COLUMNS.length; i++) {
            if (Constant.EXPORT_TO_EXCEL_COLUMNS[i].toLocaleString().toUpperCase() !== data[0][i].toLocaleString().toUpperCase()) {
              if (i === 0) {
                alert(Constant.EXPORT_TO_EXCEL_COLUMNS[i] + ' column should be the first column. Please correct and upload again.');
                return;
              }
              alert(Constant.EXPORT_TO_EXCEL_COLUMNS[i] + ' column is expected after ' + data[0][i - 1] + ' column. Please correct and upload again.');
              return;
            }
          }
        }
      }
    });
  }

  Publish(batchId) {
    var xmlBatchData = [];
    var UniqueContentIDs = this.batchDetails.filter(m => m.BATCH_ID === batchId).map(m => { return m.UniqueContent_ID });
    var selectedBatchData = this.props.storeData._uniqueContentData.filter(m => UniqueContentIDs.includes(m.UniqueContent_ID))
      .map(m => {
        return [m.UniqueContent_ID, m.MarketCode, m.PageUrl, m.Tag_Topic, m.Tag_When, m.Tag_CourseType, m.Tag_AgeRange,
        m.Tag_Duration, m.AdditionalDurationDetails, m.Tag_LanguageOfInstruction, m.Tag_LanguageLearned, m.Tag_Platform, m.Tag_Continent,
        m.Tag_Country, m.Tag_State, m.Tag_City, m.Tag_Feature, m.BannerImage, m.MetaTitle, m.MetaDescription, m.MetaRobot, m.PageTitle,
        m.VisibleIntroText, m.HiddenIntroText, m.SubHeader1, m.SubHeader2, m.ContentText1, m.ContentText2, m.BreadcrumbText,
        m.FeaturePageTag1, m.FeaturePageTag2, m.ParentPageID, m.IsActive, m.InsertDate, m.UpdateDate, m.UpdateBy]
      });
    selectedBatchData.forEach((element, index) => {
      var formatedContent = [];
      element.forEach((content, i) => {
        i === 0 || i === 31 || i === 32
          ? ''
          : content = content !== null ? this.validateXml(content) : content;
        formatedContent.push(content)
      });
      //Construct key value pair
      xmlBatchData.push({
        UniqueContent: formatedContent.reduce(function (result, field, index) {
          result[Constant.UniqueContentColumns[index]] = field;
          return result;
        }, {})
      });
    });

    this.publishToLiveData = {
      batchId: batchId,
      userName: this.props.storeData._loginDetails.userName,
      xmlData: jsonxml({ XmlDocument: xmlBatchData })
    };

    API.publishBulkUpload.call(this);
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
            <tbody>
              <p><b>Batches not published to LIVE</b></p>
              {this.state.bulkUploadDetailsData}
            </tbody>
          </table>
          : ''
        }
      </div>
    );
  }
}

export default connect((state, props) => { return { storeData: state } })(BulkUpload);
