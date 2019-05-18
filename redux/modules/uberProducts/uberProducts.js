const UBER_PRODUCTS_UBER_PRODUCTS_REQUEST = 'UBER_PRODUCTS_UBER_PRODUCTS_REQUEST';
const UBER_PRODUCTS_UBER_PRODUCTS_SUCCESS = 'UBER_PRODUCTS_UBER_PRODUCTS_SUCCESS';
const UBER_PRODUCTS_UBER_PRODUCTS_ERROR = 'UBER_PRODUCTS_UBER_PRODUCTS_ERROR';

export const searchUberProducts = coordinates => (dispatch) => {
  dispatch({ type: UBER_PRODUCTS_UBER_PRODUCTS_REQUEST });
  return fetch(`https://sandbox-api.uber.com/v1.2/products?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`, {
    headers: {
      Authorization: 'Bearer ',
    },
  })
    .then(res => res.json())
    .then(res => dispatch({ type: UBER_PRODUCTS_UBER_PRODUCTS_SUCCESS, payload: res }))
    .catch(err => dispatch({ type: UBER_PRODUCTS_UBER_PRODUCTS_ERROR, payload: err }));
};


const initialState = {
  products: [],
  loading: false,
  error: false,
};

const uberProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UBER_PRODUCTS_UBER_PRODUCTS_REQUEST:
      return {
        ...state,
        products: [],
        loading: true,
      };
    case UBER_PRODUCTS_UBER_PRODUCTS_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        products: action.payload.products,
        loading: false,
      };
    case UBER_PRODUCTS_UBER_PRODUCTS_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default uberProductsReducer;
