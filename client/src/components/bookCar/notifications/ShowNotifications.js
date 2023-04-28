import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, clearSuccessMessage } from "../../../actions/carsActions";

import "./showNotifications.css";

const ShowNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const error = useSelector((state) => state.car.error);
  const successMessage = useSelector((state) => state.car.successMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error || successMessage) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [error, successMessage]);

  const handleClose = () => {
    setShowNotification(false);
    dispatch(clearError());
    dispatch(clearSuccessMessage());
  };

  return (
    <div className="error-notification">
      {showNotification && (
        <div
          key={error || successMessage}
          className={`notification ${error ? "error" : "success"}`}
        >
          <p>{error ? error : successMessage}</p>
          <button className="close-button" onClick={handleClose}>
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowNotification;
