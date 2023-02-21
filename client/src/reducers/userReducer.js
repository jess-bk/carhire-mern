// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   REGISTER_REQUEST,
//   REGISTER_SUCCESS,
//   REGISTER_FAILURE,
//   LOGOUT_REQUEST,
//   LOGOUT_SUCCESS,
//   LOGOUT_FAILURE,
// } from "../actionCreators/userCreators";

// const initialState = {
//   users: [], // array to store all users
//   user: {}, // single user object
//   loading: false, // flag to indicate loading status
//   error: null, // error message
//   isAuthenticated: false,
// };

// const usersReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case REGISTER_REQUEST:
//       // set loading flag to true
//       return {
//         ...state,
//         loading: true,
//       };
//     case REGISTER_SUCCESS:
//       // add the new user to the users array and set loading flag to false
//       return {
//         ...state,
//         users: [...state.users, action.payload],
//         loading: false,
//       };
//     case REGISTER_FAILURE:
//       // set the error message and set loading flag to false
//       return {
//         ...state,
//         error: action.payload,
//         loading: false,
//       };
//     case LOGIN_REQUEST:
//       // set loading flag to true
//       return {
//         ...state,
//         loading: true,
//       };
//     case LOGIN_SUCCESS:
//       // update the user object with the token and set loading flag to false
//       return {
//         ...state,
//         user: {
//           ...state.user,
//           token: action.payload.token,
//           user: action.payload.user,
//           isAuthenticated: true,
//         },
//         loading: false,
//       };
//     case LOGIN_FAILURE:
//       // set the error message and set loading flag to false
//       return {
//         ...state,
//         error: action.payload,
//         loading: false,
//       };
//     case LOGOUT_REQUEST:
//       // set loading flag to true
//       return {
//         ...state,
//         loading: true,
//       };
//     case LOGOUT_SUCCESS:
//       // clear the user object and set loading flag to false
//       return {
//         ...state,
//         user: action.payload,
//         loading: false,
//       };
//     case LOGOUT_FAILURE:
//       // set the error message and set loading flag to false
//       return {
//         ...state,
//         error: action.payload,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };

// export default usersReducer;

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

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        // token: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
