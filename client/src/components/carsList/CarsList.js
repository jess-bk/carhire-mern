import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCars, getCarById } from "../../actions/carsActions";
import { GET_CARS_ERROR } from "../../actionCreators/carCreators";
import "./cars.css";

const CarsList = () => {
  const cars = useSelector((state) => state.car.cars); // get the cars from the store
  const [isFaded, setFaded] = useState(false);
  const [loading, setLoading] = useState(true); // useState to store loading status
  const error = useSelector((state) => state.car.error);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // get the dispatch function

  useEffect(() => {
    // make the GET request when the component mounts
    try {
      const fetchData = async () => {
        setLoading(true);
        const response = await dispatch(getCars());
        setLoading(false);
        return response;
      };
      fetchData();
    } catch (error) {
      dispatch({ type: GET_CARS_ERROR, error: error.message });
    }
  }, [dispatch]);

  if (error) {
    // display the error message if there is an error
    return <div>{error.message}</div>;
  }

  if (loading) {
    // display a loading spinner if the request is still loading
    return <div>Loading...</div>;
  }

  const handleClick = (id) => {
    setFaded(!isFaded);
    dispatch(getCarById(id)); // dispatch the getCar action and pass the car ID
    navigate(`/car/${id}`); // navigate to the car detail page
  };

  if (!loading) {
    return (
      <div className={`card-container ${isFaded ? "fade-out" : ""}`}>
        {cars &&
          cars.cars.length > 0 &&
          cars.cars.map((car) => (
            <div
              className="card"
              key={car._id}
              onClick={() => {
                console.log(car._id);
                handleClick(car._id);
              }}
            >
              <img src={car.imageUrls[0]} alt="img" />
              <div className="card-content">
                <div className="card-title">{car.name}</div>
                <div className="card-description">
                  <div>Model :{car.model}</div>
                  <div>Year Of Model: {car.year}</div>
                  <div>Rent Per Day £{car.pricePerDay}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  } else {
    return <div>No cars found</div>;
  }
};

export default CarsList;
