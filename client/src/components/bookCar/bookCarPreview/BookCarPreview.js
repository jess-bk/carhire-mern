import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getCarById, getBookings } from "../../../actions/carsActions";
import { useAuth } from "../../../hooks/useAuthHook";
import ShowNotification from "../notifications/ShowNotifications";
import "./bookCarPreview.css";

const BookCarPreview = () => {
  const { user, isAuthenticated } = useAuth();

  const dispatch = useDispatch();
  const { id } = useParams();
  const car = useSelector((state) => state.car.car);
  console.log("car", car);
  const bookings = useSelector((state) => state.car.bookings);

  useEffect(() => {
    if (car && bookings) {
      dispatch(getCarById(id));
      dispatch(getBookings());
    }
  }, [dispatch, id]);

  function calculateTotalBookedDays(car) {
    const start = new Date(car.startDate);
    const end = new Date(car.endDate);
    const difference = end - start;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return days;
  }

  return (
    <>
      <div className="bookcarpreview-container">
        <div className="bookcarpreview-image">
          {car && car.imageUrls && car.imageUrls[0] && (
            <img
              className="bookcarpreview-form-card-image"
              src={car.imageUrls[0]}
              alt="car"
            />
          )}
        </div>
        <div className="bookcarpreview-card-form">
          <div className="bookcarpreview-wrapper">
            <h1>{car.name}</h1>
            <p>Model: {car.model}</p>
            <p>Year: {car.year}</p>
            <p>Rent per day: £{car.pricePerDay}</p>
            <p>{calculateTotalBookedDays}</p>
          </div>
          <br />
          {isAuthenticated && user ? (
            <>
              <div className="bookcarpreview-details-form">
                <span>username: {user?.username}</span>
                <span>email address: {user?.email}</span>
              </div>
              <br />
              {<ShowNotification />}
              <button type="submit">Book Car</button>
            </>
          ) : (
            <>
              <h1>Please Login to Book Car</h1>
              <Link className="form-link-login" to="/login">
                <button className="form-button-link">
                  click here to login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookCarPreview;
