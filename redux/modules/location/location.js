const LOCATION_SEARCH_PLACES_REQUEST = 'LOCATION_SEARCH_PLACES_REQUEST';
const LOCATION_SEARCH_PLACES_SUCCESS = 'LOCATION_SEARCH_PLACES_SUCCESS';
const LOCATION_SEARCH_PLACES_ERROR = 'LOCATION_SEARCH_PLACES_ERROR';
const LOCATION_SET_LOCATION = 'LOCATION_SET_LOCATION';

export const searchPlaces = (coordinates, searchTerm) => (dispatch) => {
  dispatch({ type: LOCATION_SEARCH_PLACES_REQUEST });
  // Insert google places API KEY BELOW
  return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.latitude},${coordinates.longitude}&keyword=${searchTerm}&rankby=distance&key=`)
    .then(res => res.json())
    .then(res => {
      return dispatch({ type: LOCATION_SEARCH_PLACES_SUCCESS, payload: res });
    })
    .catch(err => {
      console.log(err);
      return dispatch({ type: LOCATION_SEARCH_PLACES_ERROR, payload: err });
    });
};

export const setLocation = coordinates => dispatch => dispatch({ type: LOCATION_SET_LOCATION, payload: coordinates });

const initialState = {
  places: [],
  loading: false,
  error: false,
  currentLocation: {},
}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_SEARCH_PLACES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOCATION_SEARCH_PLACES_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        places: action.payload.results,
        loading: false,
      };
    case LOCATION_SEARCH_PLACES_ERROR:
      return {
        ...state,
        error: true,
      };
    case LOCATION_SET_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    default:
      return state;
  }
};

export default locationReducer;
