import React from "react";
import { Route, Switch } from "react-router-dom";
import SearchResults from "./SearchResults/SearchResults";
import CreatePage from "./CreatePage/CreatePage";
import AddUser from "./UserManagement/UserDashBoard";
import BulkUpload from "./BulkUpload/BulkUpload";
import PageHierarchy from "./PageHierarchy/PageHierarchy";

export default () =>
  <Switch>
    <Route path="/SearchResults" exact component={SearchResults} />
    <Route path="/CreatePage" exact component={CreatePage} />
    <Route path="/AddUser" exact component={AddUser} />
    <Route path="/BulkUpload" exact component={BulkUpload} />
    <Route path="/PageHierarchy" exact component={PageHierarchy} />
  </Switch>;