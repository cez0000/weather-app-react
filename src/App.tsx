import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./features/Home/Home";
import About from "./features/About/About";
import Layout from "./components/Layout";
import WeatherForecast from "./features/WeatherForecast/WeatherForecats";

function App() {
  return (
    <BrowserRouter basename="/weather-app-react">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/forecast" element={<WeatherForecast />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
