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
    this.handleUploadFile = this.handleUploadFile.bind(this);

  }


  handleUploadFile() {
    function escapeXml(unsafe) {

      return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '\'': return '&apos;';
          case '"': return '&quot;';
        }
      });
    }
    const schema = {
      'Uniquecontent': {
        prop: 'Uniquecontent',
        type: {

          'UniqueContent_ID': {
            prop: 'UniqueContent_ID',
            type: Number,
            required: true
          },
          'MarketCode': {
            prop: 'MarketCode',
            type: String,
            required: true
          },

          'PageUrl': {
            prop: 'PageUrl',
            type: String,
            required: true
          },

          'Tag_Topic': {
            prop: 'Tag_Topic',
            type: String,
            required: true,
          },
          'Tag_When': {
            prop: 'Tag_When',
            type: String,
            required: false
          },
          'Tag_CourseType': {
            prop: 'Tag_CourseType',
            type: String,
            required: true
          },
          'Tag_AgeRange': {
            prop: 'Tag_AgeRange',
            type: String,
            required: false
          },
          'Tag_Duration': {
            prop: 'Tag_Duration',
            type: String,
            required: true
          },
          'AdditionalDurationDetails': {
            prop: 'AdditionalDurationDetails',
            type: String,
            required: true
          },
          'Tag_LanguageOfInstruction': {
            prop: 'Tag_LanguageOfInstruction',
            type: String,
            required: false
          },
          'Tag_LanguageLearned': {
            prop: 'Tag_LanguageLearned',
            type: String,
            required: true
          },
          'Tag_Platform': {
            prop: 'Tag_Platform',
            type: String,
            required: false
          },
          'Tag_Continent': {
            prop: 'Tag_Continent',
            type: String,
            required: true
          },
          'Tag_Country': {
            prop: 'Tag_Country',
            type: String,
            required: false
          },
          'Tag_State': {
            prop: 'Tag_State',
            type: String,
            required: true
          },
          'Tag_City': {
            prop: 'Tag_City',
            type: String,
            required: false
          },
          'Tag_Feature': {
            prop: 'Tag_Feature',
            type: String,
            required: true
          },
          'BannerImage': {
            prop: 'BannerImage',
            type: String,
            required: false
          },
          'MetaTitle': {
            prop: 'MetaTitle',
            type: String,
            required: true,
            parse(value) {
              return escapeXml(value);

            }
          },
          'MetaDescription': {
            prop: 'MetaDescription',
            type: String,
            required: false,
            parse(value) {
              return escapeXml(value);

            }
          },
          'MetaRobot': {
            prop: 'MetaRobot',
            type: String,
            required: true,
            parse(value) {
              return escapeXml(value);

            }
          },
          'PageTitle': {
            prop: 'PageTitle',
            type: String,
            required: false,
            parse(value) {
              return escapeXml(value);

            }
          },
          'VisibleIntroText': {
            prop: 'VisibleIntroText',
            type: String,
            required: true,

            parse(value) {
              return escapeXml(value);

            }

          },
          'HiddenIntroText': {
            prop: 'HiddenIntroText',
            type: String,
            required: false,
            parse(value) {
              return escapeXml(value);

            }
          },
          'SubHeader1': {
            prop: 'SubHeader1',
            type: String,
            required: true,
            parse(value) {
              return escapeXml(value);

            }

          },
          'SubHeader2': {
            prop: 'SubHeader2',
            type: String,
            required: false,
            parse(value) {
              return escapeXml(value);

            }
          },
          'ContentText1': {
            prop: 'ContentText1',
            type: String,
            required: true,
            parse(value) {
              return escapeXml(value);

            }
          },
          'ContentText2': {
            prop: 'ContentText2',
            type: String,
            required: false,
            parse(value) {
              return escapeXml(value);

            }
          },
          'BreadcrumbText': {
            prop: 'BreadcrumbText',
            type: String,
            required: true,
            parse(value) {
              return escapeXml(value);

            }
          },
          'DrillDownAlias': {
            prop: 'DrillDownAlias',
            type: String,
            required: true,
          },

          'FeaturePageTag1': {
            prop: 'FeaturePageTag1',
            type: String,
            required: false,

          },
          'FeaturePageTag2': {
            prop: 'FeaturePageTag2',
            type: String,
            required: false
          },
          'ParentPageID': {
            prop: 'ParentPageID',
            type: Number,
            required: false
          },

        }
      }

    }
    var file = document.getElementById("uploadBatchFile").files[0];

    readXlsxFile(file, { schema }).then(({ rows, errors }) => {

      var dataRow = [];
      //`errors` have shape `{ row, column, error, value }`.
      //console.log(rows[0]);

      rows.forEach(element => {
        dataRow.push(element['Uniquecontent']);
      });
      this.UpdatedUniqueContentId = '<BatchDetails xmlns="">' + dataRow.map(m => { return '<BatchRow UniqueContent_ID="' + m.UniqueContent_ID + '"/>' }).toString().replace(/,/g, ' ') + '</BatchDetails>'

      this.BulkUploadDetails = {};

      this.BulkUploadDetails.xmlData = this.UpdatedUniqueContentId;
      this.BulkUploadDetails.userName = JSON.parse(localStorage.getItem('Login'))['UserName'];

      var xml = jsonxml({

        XmlDocument: rows
      })
      this.h.userName = JSON.parse(localStorage.getItem('Login'))['UserName'];
      this.h.xmlData = xml.toString();
      this.BulkUpload();

    })
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
      url: 'http://ctdev.ef.com:3000/getBatchDetails',
      type: 'GET',
      cache: false,
      success: function (data, status, err) {
        if (data.length > 0) {
          this.setState({
            bulkUploadDetailsData: data.map(m => {
              return <tr><td className="tdBulkUpload"><p className="bulkUploadContent">Batch Id# {m.BATCH_ID}, upload date {m.UploadDate}, by {m.UpdatedBy} </p></td>
                <td className="tdBulkUpload"><button type="button" class="btn btn-primary btn-sm">Publish to LIVE</button></td>
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
            <input type="file" class="custom-file-input" id="uploadBatchFile"/>
            <label class="custom-file-label" id="uploadBatchFileLabel" for="inputGroupFile04">Choose file</label>
          </div>
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" onClick={this.handleUploadFile}>Upload</button>
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
