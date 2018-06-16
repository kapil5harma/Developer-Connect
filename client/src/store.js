import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers';
// import { createLogger } from 'redux-logger';

const initialState = {};

// const logger = createLogger({
//   collapsed: true,
//   diff: true
// });

// const middleware = [thunk, logger];
const middleware = [thunk];
let store;

function isMobileDevice() {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  );
}

// dev tools middleware
const composeSetup =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

// If device is running chrome browser and is not a mobile.
if (window.navigator.userAgent.includes('Chrome') && !isMobileDevice()) {
  store = createStore(
    rootReducer,
    initialState,
    composeSetup(applyMiddleware(...middleware))
    // composeWithDevTools(
    //   applyMiddleware(...middleware),
    //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //     window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
  );
}
// If device is running any browser other than chrome or the device is a mobile.
else {
  store = createStore(
    rootReducer,
    initialState,
    composeSetup(applyMiddleware(...middleware))
    // compose(applyMiddleware(...middleware))
  );
}

export default store;
