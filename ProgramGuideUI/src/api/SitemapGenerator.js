import axios from 'axios';
import * as API from '../utils/endpoints';
import { saveAs } from 'file-saver';
import moment from 'moment';
import xmlFormat from 'xml-formatter';
import * as CONSTANT from '../utils/constant';
import * as GENERIC from '../utils/generic';

function generateMinisiteXML() {
  //Check if there
  if (this.minisitesData.filter(m => m.marketCode === this.selectedMarket).length === 0) {
    return;
  }

  var previousPageID, rootPageID, domainName; // Hold previous and root page itemID
  var beginXMLTag, endXMLTag; // 
  var sitemapXmlData = [], xmlBody = []; // Array to store all pages corresponsing name in other markets and individual pages corresponsing name in other markets

  //Loop throught pages for all markets
  this.minisitesData.forEach((element, i, array) => {
    i === 0 ? previousPageID = element.itemID : ''; // Initialize previousPageID
    i === 0 ? rootPageID = element.itemID : ''; // Save the rootpage ID which will be used for priority

    domainName = this.props.storeData._sitemapMarkets.filter(m => m.MarketCode === element.marketCode).map(m => m.DomainName).toString();
    domainName = domainName.toString().slice(-1) === '/'
      ? domainName.toString().slice(0, -1)
      : domainName

    // Step 1 - Check if it's a new page
    if (!beginXMLTag) {
      beginXMLTag = CONSTANT.xmlUrlOpen +
        CONSTANT.xmlLocOpen +
        //Domain Name
        this.props.storeData._sitemapMarkets.filter(m => m.MarketCode === this.selectedMarket)
          .map(m => m.DomainName).toString() +
        this.minisitesData.filter(m => m.itemID === element.itemID
          && m.marketCode === this.selectedMarket)
          .map(m => { return m.pageUrl }).toString().toLowerCase() +
        CONSTANT.xmlLocClose;
    }

    // Step 2 - If itemID is different then it's a new page, generate the closing tag and store the corresponding data
    if (previousPageID !== element.itemID || i === array.length - 1) {
      var priority = previousPageID === rootPageID ? 1 : 0.5; // Priority is 1 for root page
      previousPageID = element.itemID; //Assign the new sibling page ID

      //Store the last mod and priority for each minisite page
      endXMLTag = CONSTANT.xmlLastmodOpen + moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ") + CONSTANT.xmlLastmodClose + // Lastmod Section
        CONSTANT.xmlPriorityOpen + priority + CONSTANT.xmlPriorityClose + //Priority Section 
        CONSTANT.xmlUrlClose;

      //Store each individual page data to array
      sitemapXmlData.push(beginXMLTag +
        xmlBody.map(m => { return m }).toString().replace(/,/g, ' ') +
        endXMLTag);

      beginXMLTag = CONSTANT.xmlUrlOpen +
        CONSTANT.xmlLocOpen +
        this.props.storeData._sitemapMarkets.filter(m => m.MarketCode === this.selectedMarket)
          .map(m => m.DomainName).toString() +
        this.minisitesData.filter(m => m.itemID === element.itemID
          && m.marketCode === this.selectedMarket)
          .map(m => { return m.pageUrl }).toString().toLowerCase() +
        CONSTANT.xmlLocClose

      // isFirstloop = false;
      xmlBody = []; // Reset to hold new page details
    }

    // Store the corresponding page name in rest of the markets
    xmlBody.push('<xhtml:link rel="alternate" hreflang="' +
      this.props.storeData._sitemapMarkets.filter(m => m.MarketCode === element.marketCode)
        .map(m => { return m.HreflangCode }).toString() + // hrefLangCode
      '" href="https://' +
      domainName + //Domain Name
      element.pageUrl + //Page URL
      '" />');

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

export async function getPGPages() {
  //STEP:1 Get UniversalTopic & UniqueContent data for selected market
  await axios.get(API.getUniversalTopicUniqueContentMappingPages + this.selectedMarket)
    .then(result => {
      this.MappingData = result.data;
    }).catch(err => { console.log(err) });

  //STEP:2 Get equivalent pages in other markets based on UniversalTopic in STEP 1
  await axios.get(API.getPgEquivalentPages + this.selectedMarket)
    .then(result => {
      this.PgEquivalentPages = result.data;
    }).catch(err => { console.log(err) });

  //STEP:3 Get Universal AgeGroup
  await axios.get(API.getUniversalAgeGroup + this.selectedMarket)
    .then(result => {
      this.PgUniversalAgeGroup = result.data;
    }).catch(err => { console.log(err) });

  generatePgXML.call(this);
}

function generatePgXML() {
  var sitemapXmlData = [];;
  var priority
  //Loop each pages in the selected market and find it's equivalent pages in other markets
  this.MappingData.forEach((element, i) => {
    var beginXMLTag, endXMLTag;
    var xmlBody = [];

    //Initialize and update priority
    priority = i === 0 ? 1 : 0.5;

    beginXMLTag = CONSTANT.xmlUrlOpen +
      CONSTANT.xmlLocOpen +
      this.props.storeData._sitemapMarkets.filter(m => m.MarketCode === this.selectedMarket).map(m => m.DomainName).toString().replace(/\/(?=[^\/]*$)/, '')
      + element.PageUrl
      + CONSTANT.xmlLocClose;

    endXMLTag = CONSTANT.xmlLastmodOpen + moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ") + CONSTANT.xmlLastmodClose + // Lastmod Section
      CONSTANT.xmlPriorityOpen + priority + CONSTANT.xmlPriorityClose + //Priority Section 
      CONSTANT.xmlUrlClose;

    // Filter out unmatched tags
    this.filteredPages = this.PgEquivalentPages.filter(m => m.Tags === element.Tags && m.UniversalExperience === element.UniversalExperience);

    xmlBody.push(this.filteredPages.filter(m => m.Tag_AgeRange === element.Tag_AgeRange)
      .map(m => {
        return '<xhtml:link rel="alternate" hreflang="' +
          this.props.storeData._sitemapMarkets.filter(p => p.MarketCode === m.MarketCode)
            .map(x => { return x.HreflangCode }).toString()
          +
          '" href="https://' +
          this.props.storeData._sitemapMarkets.filter(p => p.MarketCode === m.MarketCode)
            .map(x => x.DomainName).toString().replace(/\/(?=[^\/]*$)/, '')
          + m.PageUrl
          + '" />'
      }));
    //Filter out unmatched age groups
    //console.log(this.filteredPages.filter(m => m.Tag_AgeRange === element.Tag_AgeRange));
    //console.log(element.PageUrl);
    //console.log(this.filteredPages.filter(m => m.Tag_AgeRange !== element.Tag_AgeRange));
    var unmatchedAgeGroup = this.filteredPages.filter(m => m.Tag_AgeRange !== element.Tag_AgeRange);
    unmatchedAgeGroup.forEach(ageGroupData => {
      var missingAgeRange_UniversalAgeGroup = this.PgUniversalAgeGroup.filter(m => m.Tag_AgeGroup === ageGroupData.Tag_AgeRange).map(m => { return m.UniversalAgeGroup_ID })[0];
      var uniqueContentAgeRange_UniversalAgeGroup = this.PgUniversalAgeGroup.filter(m => m.Tag_AgeGroup === element.Tag_AgeRange).map(m => { return m.UniversalAgeGroup_ID })[0];

      if (missingAgeRange_UniversalAgeGroup === uniqueContentAgeRange_UniversalAgeGroup) {
        xmlBody.push('<xhtml:link rel="alternate" hreflang="' +
          this.props.storeData._sitemapMarkets.filter(p => p.MarketCode === ageGroupData.MarketCode)
            .map(x => { return x.HreflangCode }).toString() +
          '" href="https://' +
          this.props.storeData._sitemapMarkets.filter(p => p.MarketCode === ageGroupData.MarketCode)
            .map(x => x.DomainName).toString().replace(/\/(?=[^\/]*$)/, '')
          + ageGroupData.PageUrl
          + '" />')
      }
      // console.log(ageGroupData.Tag_AgeRange);
      // console.log(element.Tag_AgeRange)
      // console.log(ageGroup);
    });

    sitemapXmlData.push(beginXMLTag +
      xmlBody.map(m => { return m }).toString().replace(/,/g, '') +
      endXMLTag);
    //generatePgXML.call(this);
  });

  var xmldata = CONSTANT.rootXMLOpen + // XML open 
    sitemapXmlData.map(m => { return m }).toString().replace(/,/g, '') + // Root and sibling page content
    CONSTANT.rootXMLClose; //XML close 

  // Download the XML file
  GENERIC.generateSitemapXml(xmldata, this.xmlFileName);
}

export function getUniversalTopicUniqueContentMappingPages() {
  axios.get(API.getUniversalTopicUniqueContentMappingPages + this.selectedMarket)
    .then(result => {
      this.MappingData = result.data;
    })
    .catch(err => { console.log(err) });
}

async function getPgEquivalentPages() {
  axios.get(API.getPgEquivalentPages + this.selectedMarket)
    .then(result => {
      this.PgEquivalentPages = result.data;
    })
    .catch(err => { console.log(err) });
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