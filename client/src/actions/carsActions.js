import axios from "axios";
import {
  GET_CAR_BY_ID,
  GET_CAR_BY_ID_SUCCESS,
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
  GET_BOOKINGS_LOADING,
  CLEAR_ERROR,
  CLEAR_SUCCESS_MESSAGE,
} from "../actionCreators/carCreators";

export const getCars = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3500/api/cars/all-cars");
    console.log(res);
    dispatch({ type: GET_CARS_SUCCESS, cars: res.data });
  } catch (error) {
    dispatch({ type: GET_CARS_ERROR, error: error.message });
  }
};

export const getCarById = (id) => async (dispatch) => {
  dispatch({ type: GET_CAR_BY_ID });
  try {
    const res = await axios.get(`http://localhost:3500/api/cars/get-car/${id}`);
    dispatch({ type: GET_CAR_BY_ID_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const createBooking =
  (id, startDate, endDate, user, dates) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.tokens}`,
        // Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        withCredentials: true,
      },
    };

    const body = JSON.stringify({
      carId: id,
      startDate,
      endDate,
      user: user._id,
      dates,
    });

    try {
      const res = await axios.post(
        "http://localhost:3500/api/booking/add-booking",
        body,
        config
      );
      dispatch({
        type: BOOK_CAR_SUCCESS,
        booking: res.data,
        message: res.data.message,
      });
      console.log(res.data.message);
    } catch (err) {
      dispatch({ type: BOOK_CAR_ERROR, error: err.response.data.error });
      console.error(err.response.data.error);
    }
  };

export const cancelBooking = (bookingId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:3500/api/cars/bookings/${bookingId}`
    );
    dispatch({ type: CANCEL_BOOKING_SUCCESS, bookingId: res.data });
  } catch (error) {
    dispatch({ type: CANCEL_BOOKING_ERROR, error: error.message });
  }
};

export const getBookings = () => async (dispatch) => {
  dispatch({ type: GET_BOOKINGS_LOADING });
  try {
    const res = await axios.get(
      `http://localhost:3500/api/booking/all-bookings`
    );
    dispatch({ type: GET_BOOKINGS_SUCCESS, bookings: res.data });
    console.log("res bookings", res.data);
  } catch (error) {
    dispatch({ type: GET_BOOKINGS_ERROR, error: error.message });
  }
};

export const addCar = (carData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:3500/api/cars", carData);
    dispatch({ type: ADD_CAR_SUCCESS, car: res.data });
  } catch (error) {
    dispatch({ type: ADD_CAR_ERROR, error: error.message });
  }
};

export const deleteCar = (carId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:3500/api/cars/delete-car/${carId}`
    );
    dispatch({ type: DELETE_CAR_SUCCESS, carId: res.data._id });
  } catch (error) {
    dispatch({ type: DELETE_CAR_ERROR, error: error.message });
  }
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};

export const clearSuccessMessage = () => {
  return {
    type: CLEAR_SUCCESS_MESSAGE,
  };
};
