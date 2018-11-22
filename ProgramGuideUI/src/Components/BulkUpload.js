import React, { Component } from 'react';
import readXlsxFile from 'read-excel-file';
import jsonxml from 'jsontoxml';
import $ from 'jquery';

class BulkUpload extends Component {

  constructor() {
    super();
    this.state = {
      bulkUploadDetailsData: []
    }
    this.h = {}
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

  saveUploadedExcelData() {
    var file = document.getElementById("uploadBatchFile").files[0];
    var UniqueContentcolumns = ["UniqueContent_ID", "MarketCode", "PageUrl", "Tag_Topic", "Tag_When", "Tag_CourseType", "Tag_AgeRange", "Tag_Duration", "AdditionalDurationDetails", "Tag_LanguageOfInstruction", "Tag_LanguageLearned", "Tag_Platform", "Tag_Continent", "Tag_Country", "Tag_State", "Tag_City", "Tag_Feature", "BannerImage", "MetaTitle", "MetaDescription", "MetaRobot", "PageTitle", "VisibleIntroText", "HiddenIntroText", "SubHeader1", "SubHeader2", "ContentText1", "ContentText2", "BreadcrumbText", "DrillDownAlias", "FeaturePageTag1", "FeaturePageTag2", "ParentPageID"];
    
    readXlsxFile(file, { sheet: 1 }).then((data) => {
      var excelContent = [];
      this.validationFailed = false;
      if (JSON.stringify(UniqueContentcolumns.toLocaleString().toUpperCase().split(',')) === JSON.stringify(data[0].toLocaleString().toUpperCase().split(','))) {
        data.forEach((element, index) => {
          //First iteration contains column header
          if (index !== 0) {
            //Perform validation on the uploaded data
            var formatedContent = [];
            element.forEach((content, i) => {
              if (i === 0 || i === 32) {
               if (isNaN(content)){
                 this.validationFailed = true;
                 alert(UniqueContentcolumns[i] + ' column should contain numeric value. Please correct and upload again');
               }
              }
              else {
                content = content !== null ? this.validateXml(content) : content;
              }
              formatedContent.push(content)
            });
            //Construct key value pair
            excelContent.push(formatedContent.reduce(function (result, field, index) {
              result[UniqueContentcolumns[index]] = field;
              return result;
            }, {}));
          }

        });

        console.log(excelContent);
        if(this.validationFailed) return;

        this.UpdatedUniqueContentId = '<BatchDetails xmlns="">' + excelContent.map(m => { return '<BatchRow UniqueContent_ID="' + m.UniqueContent_ID + '"/>' }).toString().replace(/,/g, ' ') + '</BatchDetails>'

        this.BulkUploadDetails = {};

        this.BulkUploadDetails.xmlData = this.UpdatedUniqueContentId;
        this.BulkUploadDetails.userName = JSON.parse(localStorage.getItem('Login'))['UserName'];

        var xml = jsonxml({

          XmlDocument: excelContent
        })
        this.h.userName = JSON.parse(localStorage.getItem('Login'))['UserName'];
        this.h.userRole = JSON.parse(localStorage.getItem('Login'))['Roles']['RoleName'];
        this.h.xmlData = xml.toString();
        this.BulkUpload();


      }
      else {
        alert('Error! Header names of the uploaded file is either incorrect or missing or not in the expected sequence.')
      }
    });
  }

  componentDidMount() {
    this.getBulkUploadDetails();
    $('#uploadBatchFile').on('change', function () {
      //get the file name
      var fileName = document.getElementById('uploadBatchFile').files[0].name;
      //replace the "Choose a file" label
      $(this).next('.custom-file-label').html(fileName);
    })
  }

  BulkUpload() {
    $.ajax({
      url: 'http://ctdev.ef.com:3000/BulkUpload',
      type: 'POST',
      dataType: 'Text',
      data: this.h,
      cache: false,
      success: function (data, status, err) {
        this.SaveBulkUploadDetails();
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });

  }

  SaveBulkUploadDetails() {
    console.log(this.BulkUploadDetails);
    $.ajax({
      url: 'http://ctdev.ef.com:3000/CreateBatchDetails',
      type: 'POST',
      dataType: 'Text',
      data: this.BulkUploadDetails,
      cache: false,
      success: function (data, status, err) {
        this.getBulkUploadDetails();
        document.getElementById("uploadBatchFile").value = '';
        document.getElementById("uploadBatchFileLabel").innerHTML = 'Choose file';
        alert('Excel uploaded sucessfully');
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });
  }

  getBulkUploadDetails() {
    $.ajax({
      url: 'http://ctdev.ef.com:3000/getBatchDetails/?userName=' + JSON.parse(localStorage.getItem('Login'))['UserName'],
      type: 'GET',
      cache: false,
      success: function (data, status, err) {
        if (data.length > 0) {
          this.setState({
            bulkUploadDetailsData: data.map(m => {
              return <tr><td className="tdBulkUpload"><p className="bulkUploadContent">Batch Id# {m.BATCH_ID}, upload date {m.UploadDate}, by {m.UpdatedBy} </p></td>
                <td className="tdBulkUpload"><button type="button" class="btn btn-primary btn-sm">Publish to Live</button></td>
              </tr>
            })
          });
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div className="itemDiv">
        <div class="input-group">
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="uploadBatchFile" />
            <label class="custom-file-label" id="uploadBatchFileLabel" for="uploadBatchFile">Choose file</label>
          </div>
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" onClick={this.saveUploadedExcelData.bind(this)}>Upload</button>
          </div>
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
