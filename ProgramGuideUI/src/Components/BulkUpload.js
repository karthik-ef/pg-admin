import React, { Component } from 'react';
import readXlsxFile from 'read-excel-file';
import jsonxml from 'jsontoxml';
import $ from 'jquery';

let h ;

class BulkUpload extends Component {

  constructor(){
    super();
    this.h = {}
    this.handleUploadFile=this.handleUploadFile.bind(this);
    
  }

 
  
  handleUploadFile(){
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
      'Uniquecontent':{
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
	    'MarketCode': {
        prop: 'MarketCode',
        type: String,
        required: true,
      },
	    'PageUrl': {
        prop: 'PageUrl',
        type: String,
        required: true
      },
	    'Tag_Experience': {
        prop: 'Tag_Experience',
        type: String,
        required: true
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
        type: Number,
        required: true
      },
	    'Tag_LocalOffice': {
        prop: 'Tag_LocalOffice',
        type: String,
        required: false
      },
      'Tag_Language': {
        prop: 'Tag_Language',
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
	  	    'FeaturePageTag3': {
        prop: 'FeaturePageTag3',
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
    var file = document.getElementById("input").files[0];


    readXlsxFile(file, { schema }).then(({ rows, errors }) => {
       //`errors` have shape `{ row, column, error, value }`.
      
     var xml = jsonxml({
     
      XmlDocument:rows
  })
  console.log(xml);
  this.h.userName=JSON.parse(localStorage.getItem('Login'))['UserName'];
  this.h.xmlData=xml.toString();
  this.BulkUpload();
 
    })
    

    
  }
BulkUpload() {
    $.ajax({
      url: 'http://ctdev.ef.com:3000/BulkUpload',
      type: 'POST',
      dataType: 'Text',
      data: this.h,
      cache: false,
      success: function (data) {
        console.log(data);
        console.log('');
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });

  }

  render() {

    return (
      <div className="container">
      bulk upload
       <div>
      
        <input type="file" id="input"  />
      </div>
      <input type="submit" value="Upload" id="btnSubmit" onClick={this.handleUploadFile}/>
      </div>
    );
  }
}

export default BulkUpload;