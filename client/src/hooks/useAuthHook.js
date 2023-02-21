import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../actionCreators/userCreators";

export const useAuth = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User saved to local storage: ", user);
      // retrieve token from user object
      const token = user.tokens;
      // set token in browser's cookies storage
      document.cookie = `token=${token}`;
      // document.cookie = `token=${token} && ${document.cookie.split("=")[1]}`;
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Retrieved user from local storage: ", storedUser);
    if (storedUser && !isAuthenticated) {
      console.log("LOGIN_SUCCESS action dispatched with payload: ", storedUser);
      dispatch({ type: LOGIN_SUCCESS, payload: storedUser });
    }
  }, [dispatch, isAuthenticated, user]);

  return { isAuthenticated, user };
};
