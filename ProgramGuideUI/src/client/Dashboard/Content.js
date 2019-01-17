import React, { Component } from 'react';
import SearchResults from "../SearchResults/SearchResults";
import CreatePage from "../CreatePage/CreatePage";
import AddUser from "../UserManagement/UserDashBoard";
import BulkUpload from "../BulkUpload/BulkUpload";
import PageHierarchy from '../PageHierarchy/pageHierarchy';
import TopicExperienceMapping from '../Report/TopicExperienceMapping'

class Content extends Component {
  render() {

    var Role = JSON.parse(localStorage.getItem('Login'))['Roles']['RoleName'];

    if (window.location.pathname.toLowerCase() === '/') {
      window.location.pathname = '/SearchResults';
    }
    //Render the component based on URL
    const component = window.location.pathname.toLowerCase() === '/searchresults' ? <SearchResults />
      : window.location.pathname.toLowerCase() === '/createpage' ? <CreatePage />
        : Role === 'Admin' && window.location.pathname.toLowerCase() === '/adduser' ? <AddUser />
          : window.location.pathname.toLowerCase() === '/bulkupload' ? <BulkUpload />
            : window.location.pathname.toLowerCase() === '/pagehierarchy' ? <PageHierarchy />
              : window.location.pathname.toLowerCase() === '/topicexperiencemapping' ? <TopicExperienceMapping />
                : '';
    return (

      <div className="contentDiv">
        {component}
      </div>
    );
  }
}

export default Content;
