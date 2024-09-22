import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import profile from "../assets/profile.png";

export default function NavBar({ loggedIn, handleLogOut }) {
  const [menuActive, setMenuActive] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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
