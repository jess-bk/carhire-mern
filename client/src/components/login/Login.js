import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import "./login.css";

const Login = () => {
  // Declare state variables and dispatch
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  // Handle input change
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    // Destructure form data
    const { username, password } = formData;
    dispatch(login(username, password));
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-page">
        <form className="login-form" onSubmit={onSubmit}>
          <h1 className="login-form-title">Sign In</h1>
          <label htmlFor="username" className="login-form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={onChange}
            required
            className="login-form-input"
          />
          {error && error?.username && (
            <p className="login-form-error">This field is required</p>
          )}
          <br />
          <label htmlFor="password" className="login-form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
            className="login-form-input"
          />
          {error && error?.password && (
            <p className="login-form-error">This field is required</p>
          )}
          <br />
          <button type="submit" className="login-form-button">
            Sign In
          </button>
          {error && <p className="login-form-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
