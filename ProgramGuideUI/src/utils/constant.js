export const ROLES = [{ label: 'Admin', value: 'Admin' }, { label: 'General', value: 'General' }, { label: 'Power', value: 'Power' }]
export const APPLICATION_NAME = 'PROGRAMGUIDE';
export const SEARCH_URL_HEADER = 'If you know the URL of the page, please enter below';
export const SEARCH_TAG_HEADER = 'Please use the options below to specify one or more tags to start your search';
export const SEARCH_KEYWORD_HEADER = 'Please enter the keyword'
export const PAGE_URL = 'Page URL:';
export const KEYWORD = 'Keyword:';
export const SEARCH_BY_URL = 'Search By URL';
export const SEARCH_BY_TAG = 'Search By Tag';
export const SEARCH_BY_KEYWORD = 'Search By Keyword';
export const SELECTED_TAG_HEADER = 'Seleted Tags:';
export const INCLUDE_INACTIVE_PAGES = 'Include Inactive Pages';

export const ADD_USER = 'Add User';
export const EDIT_USER = 'Edit User';
export const DELETE_USER = 'Delete User';
export const ADMIN = 'Admin';
export const GENERAL = 'General'

export const EMPTY_STRING = '';

export const ERROR_SELECT_MARKET = 'Please select a market';
export const ERROR_INVALID_PAGEURL = 'Please provide valid Page url';
export const ERROR_PAGEURL_EXIST = 'Page url already exist for the selected market';
export const ERROR_USER_EXIST = 'User already exist';
export const ERROR_USER_EMPTY = 'User name cannot be empty';
export const ERROR_ROLE_EMPTY = 'Role cannot be empty';
export const ERROR_MARKET_EMPTY = 'Market cannot be empty';
export const ERROR_INVALID_USER = 'Invalid user'


export const EXPORT_TO_EXCEL_COLUMNS = ["UniqueContent_ID", "MarketCode", "PageUrl", "Tag_Topic", "Tag_When", "Tag_CourseType", "Tag_AgeRange",
    "Tag_Duration", "AdditionalDurationDetails", "Tag_LanguageOfInstruction", "Tag_LanguageLearned", "Tag_Platform", "Tag_Continent", "Tag_Country",
    "Tag_State", "Tag_City", "Tag_Feature", "BannerImage", "MetaTitle", "MetaDescription", "MetaRobot", "PageTitle", "VisibleIntroText", "HiddenIntroText",
    "SubHeader1", "SubHeader2", "ContentText1", "ContentText2", "BreadcrumbText", "FeaturePageTag1", "FeaturePageTag2", "ParentPageID"];

export const EXPORT_TOPIC_EXPERIENCE_MAPPING_REPORT = ["MarketCode", "Tag_Topic", "Tag_AgeStart", "Tag_AgeEnd", "Tag_Experience", "Products"]

export const NO_FILE_CHOSEN = 'No file chosen';

export const LABEL_CHOOSE_UPLOAD_FILE = 'Choose a file to upload';
export const LABEL_CHOOSE_FILE = 'Choose File';


export const Tag_Topic = 'Tag_Topic';
export const Tag_When = 'Tag_When';
export const Tag_CourseType = 'Tag_CourseType';
export const Tag_AgeRange = 'Tag_AgeRange';
export const Tag_Duration = 'Tag_Duration';
export const Tag_Duration_Details = 'Duration details';
export const Tag_LanguageOfInstruction = 'Tag_LanguageOfInstruction';
export const Tag_LanguageLearned = 'Tag_LanguageLearned';
export const Tag_Platform = 'Tag_Platform';
export const Tag_Continent = 'Tag_Continent';
export const Tag_Country = 'Tag_Country';
export const Tag_State = 'Tag_State';
export const Tag_City = 'Tag_City';
export const Tag_Feature = 'Tag_Feature';

export const Tag_Collection = [Tag_Topic, Tag_When, Tag_CourseType, Tag_AgeRange, Tag_Duration, Tag_Duration_Details,
    Tag_LanguageOfInstruction, Tag_LanguageLearned, Tag_Platform, Tag_Continent, Tag_Country, Tag_State, Tag_City, Tag_Feature]



//API END POINTS
// export const GET_USER_DETAILS_API = `http://ctdev.ef.com:3000/getUserDetails/`;
// export const GET_MARKETS_API = `http://ctdev.ef.com:3000/market`;
// export const UPDATE_USER_API = `http://ctdev.ef.com:3000/updateUser`;
// export const DELETE_USER_API = `http://ctdev.ef.com:3000/DeleteUser/`;

// export const USER_LOGIN_API = `http://ctdev.ef.com:3002/api/user/`;

//export const GET_UNIQUECONTENT_DATA_API = `http://ctdev.ef.com:3000/getUniqueContentResults/`;
export const GET_USERSPECIFIC_MARKETS = `http://ctdev.ef.com:3000/userMarkets`;
export const GET_UNIQUECONTENT_CONTENT_MARKETS_API = `http://ctdev.ef.com:3000/getUniqueContentMarkets`;

//Sitemap 
export const rootXMLOpen = '<?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
export const rootXMLClose = '</urlset>';
export const xmlUrlOpen = '<url>';
export const xmlUrlClose = '</url>';
export const xmlLocOpen = '<loc> https://';
export const xmlLocClose = '</loc>';
export const xmlLastmodOpen = '<lastmod>';
export const xmlLastmodClose = '</lastmod>';
export const xmlPriorityOpen = '<priority>'
export const xmlPriorityClose = '</priority>'


export const Age_Range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99];


export const UniqueContentColumns = ["UniqueContent_ID", "MarketCode", "PageUrl", "Tag_Topic", "Tag_When", "Tag_CourseType", "Tag_AgeRange",
    "Tag_Duration", "AdditionalDurationDetails", "Tag_LanguageOfInstruction", "Tag_LanguageLearned", "Tag_Platform", "Tag_Continent", "Tag_Country",
    "Tag_State", "Tag_City", "Tag_Feature", "BannerImage", "MetaTitle", "MetaDescription", "MetaRobot", "PageTitle", "VisibleIntroText", "HiddenIntroText",
    "SubHeader1", "SubHeader2", "ContentText1", "ContentText2", "BreadcrumbText", "FeaturePageTag1", "FeaturePageTag2", "ParentPageID", "IsActive", "InsertDate", "UpdateDate", "UpdateBy"];