import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  createBooking,
  getCarById,
  getBookings,
} from "../../actions/carsActions";
import { useAuth } from "../../hooks/useAuthHook";

import ShowNotification from "./notifications/ShowNotifications";

import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./bookCar.css";

const BookCar = () => {
  const { user, isAuthenticated } = useAuth();
  const [openDate, setOpenDate] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [formData, setFormData] = useState({
    user,
    carId: "",
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

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

  const { startDate, endDate } = formData;

  const toggleModal = () => {
    setOpenDate(false);
  };

  const calculateTotalBookedDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = end.getTime() - start.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return days;
  };
  const totalDays = calculateTotalBookedDays(startDate, endDate);

  const calculateTotalPrice = (numberOfDays, pricePerDay) => {
    const totalPrice = numberOfDays * pricePerDay;
    const roundedTotalPrice = Math.ceil(totalPrice);

    return roundedTotalPrice;
  };
  const totalAmount = calculateTotalPrice(totalDays, car.pricePerDay);

  function getDateArray(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const length = (end - start) / (1000 * 60 * 60 * 24) + 1;
    return Array.from({ length }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  }

  // Map bookings array to an array of disabled dates
  const disabledDates = bookings.bookings?.flatMap((booking) =>
    getDateArray(booking.startDate, booking.endDate)
  );

  const handleSelect = (ranges) => {
    console.log("handleSelect called", ranges.selection);
    if (ranges.selection) {
      setDateRange(ranges.selection);
      setFormData({
        ...formData,
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
      });
    } else {
      // set default values for ranges.selection
      setDateRange({ startDate: new Date(), endDate: new Date() });
      setFormData({ ...formData, startDate: new Date(), endDate: new Date() });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(
        createBooking(id, startDate, endDate, user, totalAmount, totalDays)
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="cards-container">
        <div className="card-car-image">
          {car && car.imageUrls && car.imageUrls[0] && (
            <img className="book-form-card" src={car.imageUrls[0]} alt="car" />
          )}
        </div>
        <div className="card-form">
          <div className="card-form-booking-wrapper">
            <h1>{car.name}</h1>
            <p>Model: {car.model}</p>
            <p>Year: {car.year}</p>
            <p>Rent per day: £{car.pricePerDay}</p>
            <p>Total Days of Booking: {totalDays}</p>
            <p>Total Price: £{totalAmount}</p>
          </div>
          <br />
          {isAuthenticated && user ? (
            <>
              <div className="user-details-form">
                <span>username: {user?.username}</span>
                <span>email address: {user?.email}</span>
              </div>
              <br />
              {<ShowNotification />}
              <form onSubmit={onSubmit}>
                <div>
                  <div
                    className="click-form-open"
                    onClick={() => setOpenDate(!openDate)}
                  >
                    <div className="date-range-display">
                      <span className="date-range-display-label">
                        Selected Dates:
                      </span>
                      <div className="date-range-display-dates">
                        <>
                          <span className="date-range-display-start-date">
                            {format(startDate, "dd/MM/yyyy")}
                          </span>
                          <span className="date-range-display-separator">
                            to
                          </span>
                          <span className="date-range-display-end-date">
                            {format(endDate, "dd/MM/yyyy")}
                          </span>
                        </>
                      </div>
                    </div>
                  </div>
                  {openDate && (
                    <div className="modal-background">
                      <div className="modal-content">
                        <div className="date-range-calendar">
                          <DateRange
                            onChange={(item) => handleSelect(item)}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            ranges={[dateRange]}
                            minDate={new Date()}
                            disabledDates={disabledDates}
                            preview={true}
                            showPreview={true}
                          />
                          <button
                            className="close-modal-button"
                            onClick={toggleModal}
                          >
                            <span>click to close</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button type="submit">Book Car</button>
              </form>
            </>
          ) : (
            <>
              <>
                <br />
                <h1>Please Login to Book Car</h1>
              </>
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

export default BookCar;
