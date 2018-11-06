import React from "react";
import { Route, Switch } from "react-router-dom";
import SearchResults from "./Components/SearchResults";
import CreatePage from "./Components/CreatePage";
import AddUser from "./Components/AddUser";
import BulkUpload from "./Components/BulkUpload";
import PageHierarchy from "./Components/PageHierarchy";

export default () =>
  <Switch>
    <Route path="/SearchResults" exact component={SearchResults} />
    <Route path="/CreatePage" exact component={CreatePage} />
    <Route path="/AddUser" exact component={AddUser} />
    <Route path="/BulkUpload" exact component={BulkUpload} />
    <Route path="/PageHierarchy" exact component={PageHierarchy} />
  </Switch>;