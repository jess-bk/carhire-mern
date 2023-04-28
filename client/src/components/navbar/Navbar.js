import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { useAuth } from "../../hooks/useAuthHook";
import decode from "jwt-decode";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = user?.tokens[0];

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
  }, [user]);

  // Handle form submission
  const handleLogout = () => {
    try {
      // e.preventDefault();
      dispatch(logout());
      localStorage.clear("user", "user.tokens");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
        <img
          className="navbar_img"
          src="data:image/jpeg;base64,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"
          alt="Logo"
        />
        <Link to="/" className="navbar_title">
          Car-Hire
        </Link>
      </div>
      <div className="navbar_center">
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>
      <div className="navbar_right">
        {isAuthenticated && user?.username ? (
          <>
            <span>{isAuthenticated && user?.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button>
              <Link to="/login">Login</Link>
            </button>
            <button>
              <Link to="/register">Register</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
