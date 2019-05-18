const UBER_ESTIMATES_UBER_ESTIMATES_REQUEST = 'UBER_ESTIMATES_UBER_ESTIMATES_REQUEST';
const UBER_ESTIMATES_UBER_ESTIMATES_SUCCESS = 'UBER_ESTIMATES_UBER_ESTIMATES_SUCCESS';
const UBER_ESTIMATES_UBER_ESTIMATES_ERROR = 'UBER_ESTIMATES_UBER_ESTIMATES_ERROR';

const UBER_ESTIMATES_SET_DESTINATION_COORDINATES = 'UBER_ESTIMATES_SET_DESTINATION_COORDINATES';
const UBER_ESTIMATES_SET_ORIGIN_COORDINATES = 'UBER_ESTIMATES_SET_ORIGIN_COORDINATES';

export const searchUberEstimates = (startCoordinates, endCoordinates) => (dispatch) => {
  dispatch({ type: UBER_ESTIMATES_UBER_ESTIMATES_REQUEST });
  dispatch({ type: UBER_ESTIMATES_SET_DESTINATION_COORDINATES, payload: endCoordinates });
  dispatch({ type: UBER_ESTIMATES_SET_ORIGIN_COORDINATES, payload: startCoordinates });
  return fetch(`https://sandbox-api.uber.com/v1.2/estimates/price?start_latitude=${startCoordinates.latitude}&start_longitude=${startCoordinates.longitude}&end_latitude=${endCoordinates.lat}&end_longitude=${endCoordinates.lng}`, {
    headers: {
      Authorization: 'Bearer ',
    },
  })
    .then(res => res.json())
    .then(res => dispatch({ type: UBER_ESTIMATES_UBER_ESTIMATES_SUCCESS, payload: res }))
    .catch(err => dispatch({ type: UBER_ESTIMATES_UBER_ESTIMATES_ERROR, payload: err }));
};


const initialState = {
  estimates: [],
  destinationCoordinates: {},
  originCoordinates: {},
  loading: false,
  error: false,
};

const uberEstimatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UBER_ESTIMATES_UBER_ESTIMATES_REQUEST:
      return {
        ...state,
        estimates: [],
        loading: true,
      };
    case UBER_ESTIMATES_UBER_ESTIMATES_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        estimates: action.payload.prices,
        loading: false,
      };
    case UBER_ESTIMATES_UBER_ESTIMATES_ERROR:
      return {
        ...state,
        error: true,
      };
    case UBER_ESTIMATES_SET_DESTINATION_COORDINATES:
      return {
        ...state,
        destinationCoordinates: action.payload,
      };
    case UBER_ESTIMATES_SET_ORIGIN_COORDINATES:
      return {
        ...state,
        originCoordinates: action.payload,
      };
    default:
      return state;
  }
};

export default uberEstimatesReducer;
