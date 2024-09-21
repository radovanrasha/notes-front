import {
  Link,
  useMatch,
  useResolvedPath,
  useLocation,
  useNavigate,
} from "react-router-dom";
import React, { useState, useContext, useEffect } from "react"; // Import useState
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { ThemeContext } from "../ThemeContext";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import profile from "../assets/profile.png";

export default function () {
  const cookies = new Cookies();
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState();
  const [menuActive, setMenuActive] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

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
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogOut = () => {
    cookies.remove("jwt");
    cookies.remove("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="top-header">
      <nav className="nav">
        <div className="hamburger" onClick={() => setMenuActive(!menuActive)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuActive ? "active" : ""}>
          <CustomLink setMenuActive={setMenuActive} to="/home">
            Home
          </CustomLink>
          {loggedIn && (
            <CustomLink setMenuActive={setMenuActive} to="/notes">
              Your Notes
            </CustomLink>
          )}
          <CustomLink setMenuActive={setMenuActive} to="/public-notes">
            Public Notes
          </CustomLink>
          <CustomLink setMenuActive={setMenuActive} to="/about">
            About me
          </CustomLink>
        </ul>
      </nav>
      <div className="navright">
        {loggedIn && (
          <>
            <button className="logSwitch" onClick={handleLogOut}>
              Log out
            </button>
            <Link to="/my-profile">
              <img className="profileIcon" src={profile} alt="Profile" />
            </Link>
          </>
        )}

        <button className="toggleThemeButton" onClick={toggleTheme}>
          {theme === "light" ? (
            <img className="toggleThemeIcon" src={moon} alt="Profile" />
          ) : (
            <img className="toggleThemeIcon" src={sun} alt="Profile" />
          )}
        </button>
      </div>
    </div>
  );
}

function CustomLink({ to, children, setMenuActive }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({
    path: resolvedPath.pathname,
    end: true,
  });

  return (
    <li className={isActive ? "active" : ""}>
      <Link
        onClick={() => {
          setMenuActive(false);
        }}
        to={to}
      >
        {children}
      </Link>
    </li>
  );
}
