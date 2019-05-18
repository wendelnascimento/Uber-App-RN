import { combineReducers } from 'redux';

import locationReducer from './location/location';
import uberProductsReducer from './uberProducts/uberProducts';
import uberEstimatesReducer from './uberEstimates/uberEstimates';
import uberRequestsReducer from './uberRequests/uberRequests';

export default combineReducers({
  locationReducer,
  uberProductsReducer,
  uberEstimatesReducer,
  uberRequestsReducer,
});
