import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  console.log("error", error);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    const { name, email, username, password } = formData;
    e.preventDefault();
    dispatch(registerUser(name, email, username, password));
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-page">
        <img
          className="register-image"
          src="https://bluesky-cogcms-prodb.cdn.imgeng.in/media/57670/divo-exterior.jpg"
          alt=""
        />

        <form onSubmit={onSubmit} className="register-form">
          <h1 className="register-form-title">Sign Up</h1>
          <div className="register-form-group">
            <label htmlFor="name" className="register-form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="register-form-input"
            />
            {error?.name && (
              <p className="register-form-error">This field is required</p>
            )}
          </div>
          <div className="register-form-group">
            <label htmlFor="email" className="register-form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
              className="register-form-input"
            />
            {error && error?.email && (
              <p className="register-form-error">This field is required</p>
            )}
            {error && error?.email && (
              <p className="register-form-error">Invalid email address</p>
            )}
          </div>
          <div className="register-form-group">
            <label htmlFor="username" className="register-form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={onChange}
              required
              className="register-form-input"
            />
            {error && error?.username && (
              <p className="register-form-error">This field is required</p>
            )}
            {error && error?.username && (
              <p className="register-form-error">
                Username must be at least 3 characters
              </p>
            )}
          </div>
          <div className="register-form-group">
            <label htmlFor="password" className="register-form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
              className="register-form-input"
            />
            {error && error?.password && (
              <p className="register-form-error">This field is required</p>
            )}
            {error && error?.password && (
              <p className="register-form-error">
                Password must be at least 8 characters
              </p>
            )}
          </div>
          <button
            type="submit
              "
            className="register-form-button"
          >
            Register
          </button>
          {error && <p className="register-form-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
