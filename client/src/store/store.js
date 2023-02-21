import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer";
import carReducer from "../reducers/carReducer";

const rootReducer = combineReducers({
  user: userReducer,
  car: carReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
