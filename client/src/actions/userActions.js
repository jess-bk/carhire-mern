import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../actionCreators/userCreators";

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post("http://localhost:3500/api/login", {
      username,
      password,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    //     const { user } = response.data;
    //     const {
    //       user: { tokens },
    //     } = response.data;

    dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
  } catch (err) {
    console.log(err);
    dispatch({ type: LOGIN_FAILURE, payload: err.data });
  }
};

export const registerUser =
  (name, email, username, password) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      const response = await axios.post("http://localhost:3500/api/register", {
        name,
        email,
        username,
        password,
      });
      console.log("response", response);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("error client", error);
      dispatch({ type: REGISTER_FAILURE, payload: error.response.data });
    }
  };

export const logout = () => async (dispatch) => {
  console.log();
  dispatch({ type: LOGOUT_REQUEST });

  try {
    const response = await axios.get("http://localhost:3500/api/logout", {
      withCredentials: true,
    });
    dispatch({ type: LOGOUT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.response.data });
  }
};
