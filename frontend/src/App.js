import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Products from "./pages/Products";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./redux/userSlice";

//React slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  console.log("authh-->", user, isAuth);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
