import React from "react";
import { Route, Switch } from "react-router-dom";
import SearchResults from "./Components/SearchResults";
import ComparePages from "./Components/ComparePages";
import AddUser from "./Components/AddUser";
import BulkUpload from "./Components/BulkUpload";

export default () =>
  <Switch>
    <Route path="/SearchResults" exact component={SearchResults} />
    <Route path="/ComparePages" exact component={ComparePages} />
    <Route path="/AddUser" exact component={AddUser} />
    <Route path="/BulkUpload" exact component={BulkUpload} />
  </Switch>;