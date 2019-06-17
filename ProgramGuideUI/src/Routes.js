import React from "react";
import { Route, Switch } from "react-router-dom";
import SearchResults from "./client/SearchResults/SearchResults";
import CreatePage from "./client/CreatePage/CreatePage";
import AddUser from "./client/UserManagement/UserDashBoard";
import BulkUpload from "./client/BulkUpload/BulkUpload";
import PageHierarchy from "./client/PageHierarchy/pageHierarchy";
import TopicExperienceMapping from './client/Report/TopicExperienceMapping';
import SitemapGenerator from './client/Report/SitemapGenerator';
import ExportPgData from './client/Report/ExportPgData';
import AgeGroup from './client/Report/AgeReport';
import Publish from './client/Publish/PublishToLive';
import SitemapUniversalExperience from  './client/Report/Sitemap_UniversalExperience';
import SitemapUniversalAgeGroup from './client/Report/Sitemap_UniversalAgeGroup';
import * as Path from '../src/utils/routepath';
import storeData from './store/config';

export default () =>
  < Switch >
    <Route path="/" exact component={SearchResults} />
    <Route path={Path.SearchResults} exact component={SearchResults} />
    <Route path={Path.CreatePage} exact component={CreatePage} />
    <Route path={Path.BulkUpload} exact component={BulkUpload} />
    <Route path={Path.PageHierarchy} exact component={PageHierarchy} />
    <Route path={Path.TopicExperienceMapping} exact component={TopicExperienceMapping} />
    <Route path={Path.ExportPgData} exact component={ExportPgData} />
    <Route path={Path.AgeGroup} exact component={AgeGroup} />
    <Route path={Path.SitemapUniversalExperience} exact component={SitemapUniversalExperience} />
    <Route path={Path.SitemapUniversalAgeGroup} exact component={SitemapUniversalAgeGroup} />

    <Route path={Path.Publish} exact component={Publish} />
    {/* Components available for admin users only */}
    <Route path={Path.AddUser} exact component={storeData.getState()._loginDetails.roleName !== 'Admin' ? null : AddUser} />
    <Route path={Path.SitemapGenerator} exact component={storeData.getState()._loginDetails.roleName !== 'Admin' ? null : SitemapGenerator} />
    <Route path={Path.Publish} exact component={storeData.getState()._loginDetails.userName === 'karthik.subbarayappa' ||
      storeData.getState()._loginDetails.userName === 'hao.peng' ||
      storeData.getState()._loginDetails.userName === 'ruobing.ai'
      ? Publish
      : ''} />

    {/*  */}
  </Switch >;