import {
  GET_CARS_SUCCESS,
  GET_CARS_ERROR,
  GET_CAR_SUCCESS,
  GET_CAR_ERROR,
  BOOK_CAR_SUCCESS,
  BOOK_CAR_ERROR,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_ERROR,
  GET_BOOKINGS_SUCCESS,
  GET_BOOKINGS_ERROR,
  ADD_CAR_SUCCESS,
  ADD_CAR_ERROR,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_ERROR,
  GET_CAR_BY_ID,
  GET_CAR_BY_ID_SUCCESS,
  GET_BOOKINGS_LOADING,
  CLEAR_ERROR,
  CLEAR_SUCCESS_MESSAGE,
} from "../actionCreators/carCreators";

const initialState = {
  cars: [],
  car: {},
  loading: false,
  bookings: [],
  successMessage: null,
  clearSuccessMessage: null,
  error: null,
};

const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARS_SUCCESS:
      return {
        ...state,
        cars: action.cars,
      };
    case GET_CARS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case GET_CAR_SUCCESS:
      return {
        ...state,
        car: action.car,
      };
    case GET_CAR_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case GET_CAR_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case GET_CAR_BY_ID_SUCCESS:
      return {
        ...state,
        car: action.payload,
        loading: false,
      };
    case BOOK_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        booking: action.payload,
        successMessage: action.message,
        error: null,
      };
    case BOOK_CAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: null,
      };

    case CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking._id !== action.bookingId
        ),
      };
    case CANCEL_BOOKING_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case GET_BOOKINGS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.bookings,
        loading: false,
        error: null,
      };
    case GET_BOOKINGS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_CAR_SUCCESS:
      return {
        ...state,
        cars: [...state.cars, action.car],
      };
    case ADD_CAR_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case DELETE_CAR_SUCCESS:
      return {
        ...state,
        cars: state.cars.filter((car) => car._id !== action.carId),
      };
    case DELETE_CAR_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default carsReducer;
