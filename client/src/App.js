import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import CarId from "./pages/carId/CarId";
import CarsList from "./pages/cars/Cars";
import Home from "./pages/home/Home";
import BookCars from "./pages/bookCar/BookCar";
import BookCarPreview from "./components/bookCar/bookCarPreview/BookCarPreview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cars" element={<CarsList />} />
        <Route path="/car/:id" element={<CarId />} />
        <Route path="/book-car/:id" element={<BookCars />} />
        <Route path="/book-preview/:id" element={<BookCarPreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
