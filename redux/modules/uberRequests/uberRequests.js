const UBER_REQUESTS_REQUESTS_ESTIMATE_REQUEST = 'UBER_REQUESTS_REQUESTS_ESTIMATE_REQUEST';
const UBER_REQUESTS_REQUESTS_ESTIMATE_SUCCESS = 'UBER_REQUESTS_REQUESTS_ESTIMATE_SUCCESS';
const UBER_REQUESTS_REQUESTS_ESTIMATE_ERROR = 'UBER_REQUESTS_REQUESTS_ESTIMATE_ERROR';

const UBER_REQUESTS_REQUESTS_REQUEST = 'UBER_REQUESTS_REQUESTS_REQUEST';
const UBER_REQUESTS_REQUESTS_SUCCESS = 'UBER_REQUESTS_REQUESTS_SUCCESS';
const UBER_REQUESTS_REQUESTS_ERROR = 'UBER_REQUESTS_REQUESTS_ERROR';

const UBER_REQUESTS_REQUESTS_CURRENT_REQUEST = 'UBER_REQUESTS_REQUESTS_CURRENT_REQUEST';
const UBER_REQUESTS_REQUESTS_CURRENT_SUCCESS = 'UBER_REQUESTS_REQUESTS_CURRENT_SUCCESS';
const UBER_REQUESTS_REQUESTS_CURRENT_ERROR = 'UBER_REQUESTS_REQUESTS_CURRENT_ERROR';

export const searchUberRequestEstimates = (productId, startCoordinates, endCoordinates) => (dispatch) => {
  dispatch({ type: UBER_REQUESTS_REQUESTS_ESTIMATE_REQUEST });
  const body = {
    product_id: productId,
    start_latitude: startCoordinates.latitude,
    start_longitude: startCoordinates.longitude,
    end_latitude: endCoordinates.lat,
    end_longitude: endCoordinates.lng,
  };
  return fetch('https://sandbox-api.uber.com/v1.2/requests/estimate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(res => dispatch({ type: UBER_REQUESTS_REQUESTS_ESTIMATE_SUCCESS, payload: res }))
    .catch(err => dispatch({ type: UBER_REQUESTS_REQUESTS_ESTIMATE_ERROR, payload: err }));
};

export const requestRide = (fareId, productId, startCoordinates, endCoordinates) => (dispatch) => {
  dispatch({ type: UBER_REQUESTS_REQUESTS_REQUEST });
  const body = {
    fare_id: fareId,
    product_id: productId,
    start_latitude: startCoordinates.latitude,
    start_longitude: startCoordinates.longitude,
    end_latitude: endCoordinates.lat,
    end_longitude: endCoordinates.lng,
  };
  return fetch('https://sandbox-api.uber.com/v1.2/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(res => dispatch({ type: UBER_REQUESTS_REQUESTS_SUCCESS, payload: res }))
    .catch(err => dispatch({ type: UBER_REQUESTS_REQUESTS_ERROR, payload: err }));
};

export const getCurrentRide = rideId => (dispatch) => {
  dispatch({ type: UBER_REQUESTS_REQUESTS_CURRENT_REQUEST });
  return fetch(`https://sandbox-api.uber.com/v1.2/requests/${rideId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
  })
    .then(res => res.json())
    .then(res => dispatch({ type: UBER_REQUESTS_REQUESTS_CURRENT_SUCCESS, payload: res }))
    .catch(err => dispatch({ type: UBER_REQUESTS_REQUESTS_CURRENT_ERROR, payload: err }));
};


const initialState = {
  fare: [],
  pickupEstimate: null,
  request: {},
  loading: false,
  error: false,
};

const uberRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UBER_REQUESTS_REQUESTS_ESTIMATE_REQUEST:
      return {
        ...state,
        fare: [],
        loading: true,
      };
    case UBER_REQUESTS_REQUESTS_ESTIMATE_SUCCESS:
      return {
        ...state,
        fare: action.payload.fare,
        pickupEstimate: action.payload.pickup_estimate,
        loading: false,
      };
    case UBER_REQUESTS_REQUESTS_ESTIMATE_ERROR:
      return {
        ...state,
        error: true,
      };
    case UBER_REQUESTS_REQUESTS_REQUEST:
      return {
        ...state,
        request: {},
        loading: true,
      };
    case UBER_REQUESTS_REQUESTS_CURRENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UBER_REQUESTS_REQUESTS_SUCCESS:
    case UBER_REQUESTS_REQUESTS_CURRENT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        request: action.payload,
        loading: false,
      };
    case UBER_REQUESTS_REQUESTS_ERROR:
    case UBER_REQUESTS_REQUESTS_CURRENT_ERROR:
      // console.log(action.payload);
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default uberRequestsReducer;
