import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

var defaultState = {
  _uniqueContentData: [],
  _uniqueContentTags: []
};

function amount(state = defaultState, action) {
  if (action.type === 'store_LoginDetails') {
    return {
      ...state, _loginDetails: action.data
    }
  }
  else if (action.type === 'store_EfCom20_Content_UserMarkets') {
    return {
      ...state, _efCom20_Content_UserMarkets: action.data
    }
  }
  else if (action.type === 'store_EfCom_OrganicSearch_Markets') {
    return {
      ...state, _efCom_OrganicSearch_Markets: action.data
    }
  }
  else if (action.type === 'store_UserMarkets') {
    return {
      ...state, _userMarkets: action.data
    }
  }
  else if (action.type === 'store_UniqueContentData') {
    return {
      ...state, _uniqueContentData: state._uniqueContentData.concat(action.data)
    }
  }
  // Remove the edited page(content editor) from store data while it's been saved to DB
  else if (action.type === 'store_RemoveEditedPage') {
    return {
      ...state, _uniqueContentData: action.data
    }
  }
  // Insert the edited page(content editor) back to the store data once it's saved to DB
  else if (action.type === 'store_InsertEditedPage') {
    return {
      ...state, _uniqueContentData: state._uniqueContentData.concat(action.data)
    }
  }
  else if (action.type === 'store_DurationTags') {
    return {
      ...state, _durationTags: action.data
    }
  }
  else if (action.type === 'store_PlatformTags') {
    return {
      ...state, _platformTags: action.data
    }
  }
  else if (action.type === 'store_UniqueContentTags') {
    return {
      ...state, _uniqueContentTags: state._uniqueContentTags.concat(action.data)
    }
  }
  else if (action.type === 'store_SelectedMarket') {
    return {
      ...state, _selectedMarket: action.data
    }
  }
  else if (action.type === 'store_BannerImageData') {
    return {
      ...state, _bannerImageData: action.data
    }
  }

  else if (action.type === 'store_UserDashboardData') {
    return {
      ...state, _userDashboardData: action.data
    }
  }
  else if (action.type === 'store_SitemapWebsites') {
    return {
      ...state, _sitemapWebsites: action.data
    }
  }
  //Store sitemap execution status; True - executing, false - completed
  else if (action.type === 'store_SitemapExecutionStatus') {
    return {
      ...state, _isSitemapExecuting: action.data
    }
  }
   //Store markets list for sitemap
   else if (action.type === 'store_SitemapMarkets') {
    return {
      ...state, _sitemapMarkets: action.data
    }
  }
   //Store sitemap minsites data
   else if (action.type === 'store_SitemapMinisitesData') {
    return {
      ...state, _sitemapMinisitesData: action.data
    }
  }
  
  return state;
}

var logger = createLogger({ collapsed: false });

var store = createStore(amount, applyMiddleware(thunk, logger));  //Redux store

// Read the state
store.subscribe(function () {
  //  console.log('state', store.getState());
})

//store.dispatch({ type: 'Test', data: '300.65' });  // Update

export default store;