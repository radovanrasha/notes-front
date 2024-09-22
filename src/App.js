import "./App.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./ThemeContext";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import About from "./pages/About";
import PublicNotes from "./pages/PublicNotes";
import PublicNote from "./pages/PublicNote";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import GuestRoute from "./GuestRoutes";
import PrivateRoute from "./PrivateRoutes";

function App() {
  const cookies = new Cookies();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = cookies.get("jwt");
      if (!token) {
        setLoggedIn(false);
        return;
      }

      try {
        const decoded = jwt(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setLoggedIn(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  const handleLogOut = () => {
    cookies.remove("jwt");
    cookies.remove("user");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <ThemeProvider>
        <NavBar loggedIn={loggedIn} handleLogOut={handleLogOut}></NavBar>
        <div className="routes-div">
          <Routes>
            <Route path="/" element={<Home loggedIn={loggedIn}></Home>}></Route>
            <Route
              path="/register"
              element={
                <GuestRoute isLoggedIn={loggedIn}>
                  <Register></Register>
                </GuestRoute>
              }
            ></Route>
            <Route
              path="/notes"
              element={
                <PrivateRoute isLoggedIn={loggedIn}>
                  <Notes></Notes>
                </PrivateRoute>
              }
            ></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route
              path="/public-notes"
              element={<PublicNotes></PublicNotes>}
            ></Route>
            <Route
              path="/public-notes/:id"
              element={<PublicNote></PublicNote>}
            ></Route>
            <Route path="/my-profile" element={<MyProfile></MyProfile>}></Route>
            <Route
              path="/*"
              element={<Home loggedIn={loggedIn}></Home>}
            ></Route>
          </Routes>
          <Footer></Footer>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
