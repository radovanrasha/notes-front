import "./App.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./ThemeContext";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import About from "./pages/About";
import PublicNotes from "./pages/PublicNotes";
import PublicNote from "./pages/PublicNote";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Register from "./pages/Register";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import GuestRoute from "./GuestRoutes";
import PrivateRoute from "./PrivateRoutes";
import MyProfile from "./pages/MyProfile";

function App() {
  const cookies = new Cookies();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    if (!cookies || !cookies.get("jwt")) {
      return;
    }

    const decoded = jwt(cookies.get("jwt"));

    if (!decoded || !decoded.exp) {
      return;
    }

    const currentTime = Date.now() / 1000; // in seconds

    if (decoded.exp < currentTime) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [location.pathname, loggedIn]);

  return (
    <>
      <ThemeProvider>
        <NavBar></NavBar>
        <div className="routes-div">
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>

            <Route
              path="/register"
              element={
                <GuestRoute isLoggedIn={loggedIn}>
                  <Register></Register>
                </GuestRoute>
              }
            ></Route>

            <Route path="/projects" element={<Projects></Projects>}></Route>

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

            <Route path="/*" element={<Home></Home>}></Route>
          </Routes>
          <Footer></Footer>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
