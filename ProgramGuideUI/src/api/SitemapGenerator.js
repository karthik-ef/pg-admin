import axios from 'axios';
import * as API from '../utils/endpoints';
import { saveAs } from 'file-saver';
import moment from 'moment';
import xmlFormat from 'xml-formatter';
import * as CONSTANT from '../utils/constant';
import * as GENERIC from '../utils/generic';

function generateMinisiteXML() {

  //Check if there
  if (this.minisitesData.filter(m => m.marketCode === this.props.storeData._sitemapMarkets
    .filter(m => m.MarketCode === this.selectedMarket)
    .map(m => { return m.HreflangCode }).toString()).length === 0) {
    return;
  }

  var previousPageID, rootPageID, domainName; // Hold previous and root page itemID
  var beginXMLTag, endXMLTag; // 
  var sitemapXmlData = [], xmlBody = []; // Array to store all pages corresponsing name in other markets and individual pages corresponsing name in other markets
  var isDifferentMinisitePage = true;

  //Loop throught pages for all markets
  this.minisitesData.forEach((element, i) => {
    i === 0 ? previousPageID = element.itemID : ''; // Initialize previousPageID
    i === 0 ? rootPageID = element.itemID : ''; // Save the rootpage ID which will be used for priority

    domainName = this.props.storeData._sitemapMarkets.filter(m => m.HreflangCode === element.marketCode).map(m => m.DomainName).toString();
    domainName = domainName.toString().slice(-1) === '/'
      ? domainName.toString().slice(0, -1)
      : domainName

    // Step 1 - Check if it's a new page
    if (isDifferentMinisitePage) {
      beginXMLTag = CONSTANT.xmlUrlOpen +
        CONSTANT.xmlLocOpen +
        domainName +
        this.minisitesData.filter(m => m.itemID === element.itemID
          && m.marketCode === this.props.storeData._sitemapMarkets
            .filter(m => m.MarketCode === this.selectedMarket)
            .map(m => { return m.HreflangCode }).toString())
          .map(m => { return m.pageUrl }).toString().toLowerCase() +
        CONSTANT.xmlLocClose;
    }

    // Step 2 - If itemID is different then it's a new page, generate the closing tag and store the corresponding data
    if (previousPageID !== element.itemID) {
      var priority = previousPageID === rootPageID ? 1 : 0.5; // Priority is 1 for root page
      previousPageID = element.itemID; //Assign the new sibling page ID
      isDifferentMinisitePage = true; // Reset the flag

      //Store the last mod and priority for each minisite page
      endXMLTag = CONSTANT.xmlLastmodOpen + moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ") + CONSTANT.xmlLastmodClose + // Lastmod Section
        CONSTANT.xmlPriorityOpen + priority + CONSTANT.xmlPriorityClose + //Priority Section 
        CONSTANT.xmlUrlClose;

      //Store each individual page data to array
      sitemapXmlData.push(beginXMLTag +
        xmlBody.map(m => { return m }).toString().replace(/,/g, ' ') +
        endXMLTag);

      xmlBody = []; // Reset to hold new page details
    }

    // Store the corresponding page name in rest of the markets
    xmlBody.push('<xhtml:link rel="alternate" hreflang="' +
      element.marketCode + // hrefLangCode
      '" href="https://' +
      domainName + //Domain Name
      element.pageUrl + //Page URL
      '" />');

    isDifferentMinisitePage = false; // Page will be different only when ItemID is not same
  });

  var xmldata = CONSTANT.rootXMLOpen + // XML open 
    sitemapXmlData.map(m => { return m }).toString().replace(/,/g, ' ') + // Root and sibling page content
    CONSTANT.rootXMLClose; //XML close 

  // Download the XML file
  GENERIC.generateSitemapXml(xmldata, this.xmlFileName);
}

//Fetch sitemap data for minisite pages
export async function getSitemapMinisites() {
  if (this.props.storeData.store_SitemapMinisitesData) {
    this.minisitesData = this.props.storeData.store_SitemapMinisitesData;
    await generateMinisiteXML.call(this);
  }
  else {
    await axios.get(API.getSitemapMinisites + this.selectedWebsite.toLowerCase())
      .then(result => {
        this.minisitesData = result.data;
        generateMinisiteXML.call(this)
        // console.log(result.data.filter(m => m.marketCode === 'en'));
      }).catch(err => { console.log(err) });
  }
}

export async function getSitemapSearchPages() {
  await axios.get(API.getSitemapSearchPages + this.selectedWebsite + '&marketCode=' + this.selectedMarket)
    .then(result => {
      this.XMLData = groupBy(result.data, function (item) {
        return item.RelativePageUrl.toString();
      });
      this.siteMapXmlData = [];
      var rootXMLOpen = '<?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
      var rootXMLClose = '</urlset>';
      var xmlUrlOpen = '<url>';
      var xmlUrlClose = '</url>';
      var xmlLocOpen = '<loc> https://';
      var xmlLocClose = '</loc>';
      var xmlLastmodOpen = '<lastmod>';
      var xmlLastmodClose = '</lastmod>';
      var xmlPriorityOpen = '<priority>';
      var xmlPriorityClose = '</priority>';

      console.log(this.XMLData);
      this.XMLData.forEach((element, i) => {
        var priority = Object.keys(element).toString().replace(/\//g, '').toLowerCase() === this.selectedWebsite.replace(/\//g, '').toLowerCase() ? '1' : '0.5';
        this.siteMapXmlData.push(
          xmlUrlOpen + xmlLocOpen + element[Object.keys(element)].map(m => { return m.Domain })[0]
          + element[Object.keys(element)].map(m => { return m.RelativePageUrl })[0] + xmlLocClose +
          element[Object.keys(element)].map(m => {
            return '<xhtml:link rel="alternate" hreflang="' + m.HrefLangCode + '" href="https://' + m.PageUrl + '" />'
          }).toString().replace(/,/g, ' ') +
          xmlLastmodOpen + moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ") + xmlLastmodClose + xmlPriorityOpen + priority + xmlPriorityClose + xmlUrlClose
        );
      });
      var xmlReport = rootXMLOpen + this.siteMapXmlData.join('\n') + rootXMLClose;
      var blob = new Blob([xmlFormat(xmlReport)], { type: "text/xml" });
      saveAs(blob, this.xmlFileName);
    }).catch(err => { console.log(err) });
}

//Group by Function
function groupBy(array, f) {
  var groups = {};
  var group;
  array.forEach(function (o) {
    group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (group) {
    return { [group.toString().replace(/"/g, '')]: groups[group] };
  })
}

// function getPageDatabase_SearchPages() {
//   axios.get(API.getPageDatabase_SearchPages + this.siteMapPageUrl)
//     .then(result => {
//       console.log(result.data);
//       this.XMLData.push({ [result.data.map(m => { return m.PageUrl })[0]]: result.data });
//       console.log('-----------------------------');
//       console.log(this.XMLData.length);
//       console.log(this.Row);
//       if (this.XMLData.length === this.Row) {
//         this.siteMapXmlData = [];
//         var rootXMLOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
//         var rootXMLClose = '</urlset>';
//         var xmlUrlOpen = '<url>';
//         var xmlUrlClose = '</url>';
//         var xmlLocOpen = '<loc>https://www.ef.co.';
//         var xmlLocClose = '</loc>';
//         var xmlLastmodOpen = '<lastmod>';
//         var xmlLastmodClose = '</lastmod>';
//         var xmlPriorityOpen = '<priority>'
//         var xmlPriorityClose = '</priority>'

//         this.XMLData.forEach(element => {
//           var priority = Object.keys(element).toString().replace(/\//g, '').toLowerCase() === this.selectedWebsite.replace(/\//g, '').toLowerCase() ? '1' : '0.5';
//           this.siteMapXmlData.push(
//             xmlUrlOpen + xmlLocOpen + this.selectedMarket.toLowerCase() + Object.keys(element).toString() + xmlLocClose +
//             element[Object.keys(element)].map(m => { return '<xhtml:link rel="alternate" hreflang="' + m.MarketCode + '" href="https://' + m.relativeUrl + '" />' }).toString().replace(/,/g, ' ') +
//             xmlLastmodOpen + moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ") + xmlLastmodClose + xmlPriorityOpen + priority + xmlPriorityClose + xmlUrlClose
//           );
//         });
//         this.props.dispatch({ type: 'store_SitemapExecutionStatus', data: false });
//         var xmlReport = rootXMLOpen + this.siteMapXmlData.join('\n') + rootXMLClose;
//         var blob = new Blob([xmlFormat(xmlReport)], { type: "text/xml" });
//         saveAs(blob, this.xmlFileName);
//       }
//       this.props.dispatch({ type: 'store_SitemapProgressStatus', data: Math.round((this.XMLData.length / this.Row) * 100) });

//     })
//     .catch(err => {
//       console.log(err);
//     })
// }