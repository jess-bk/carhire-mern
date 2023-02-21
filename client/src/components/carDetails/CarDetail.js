import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarById } from "../../actions/carsActions";
import { GET_CAR_ERROR } from "../../actionCreators/carCreators";
import { useNavigate, useParams } from "react-router-dom";
import "./carDetails.css";

const CarDetail = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const car = useSelector((state) => state.car.car);
  const error = useSelector((state) => state.car.error);

  const { id } = useParams(); // this will get the id from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("car :", car);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleClick = () => {
    navigate(`/book-car/${id}`);
  };

  useEffect(() => {
    // make the GET request when the component mounts
    try {
      const fetchData = async () => {
        setLoading(true);
        const response = await dispatch(getCarById(id));
        setLoading(false);
        return response;
      };
      fetchData();
    } catch (error) {
      dispatch({ type: GET_CAR_ERROR, error: error.message });
    }
  }, [dispatch, id]);

  if (error) {
    // display the error message if there is an error
    return <div>{error.message}</div>;
  }

  if (loading) {
    // display a loading spinner if the request is still loading
    return <div>Loading...</div>;
  }

  if (car) {
    return (
      <>
        <div className="card-container-details">
          <div className="card-details">
            {!selectedImage ? (
              <img
                className="card-image-details"
                src={car?.imageUrls[0]}
                alt="car"
              />
            ) : (
              <img
                className="card-image-details"
                src={selectedImage}
                alt="car"
              />
            )}
            <div className="card-content-details">
              <h1 className="card-title-details">{car.name}</h1>
              <p className="card-description-details">Model: {car.model}</p>
              <p className="card-description-details">Year: {car.year}</p>
              <p className="card-description-details">
                Rent per day: £{car.pricePerDay}
              </p>
            </div>
            <div className="button_wrapper">
              <button onClick={handleClick} className="button_bookcar">
                Book Car
              </button>
            </div>
          </div>
          <div className="card-img">
            <div className="card-details-images">
              {car &&
                car.imageUrls.length > 0 &&
                car.imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    className="card-image-details-img"
                    src={imageUrl}
                    alt="car"
                    onClick={() => handleImageClick(imageUrl)}
                  />
                ))}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default CarDetail;
