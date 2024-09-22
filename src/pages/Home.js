import { Input, Button, notification, Modal } from "antd";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import notesapplogo from "../assets/notesapplogo.png";

const Home = ({ loggedIn }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const cookies = new Cookies();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!cookies || !cookies.get("jwt")) {
      return;
    }

    const decoded = jwt(cookies.get("jwt"));
    if (decoded && decoded._id) {
      setUsername(decoded._id.username);
    }
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        notification.error({
          message: "Please enter email and password.",
          duration: 2,
          placement: "bottomRight",
        });
        return;
      }

      const body = { email, password };
      const res = await Axios.post(`${SERVER_URL}/login`, body);
      const decoded = jwt(res.data.token);

      cookies.set("jwt", res.data.token, {
        expires: new Date(decoded.exp * 1000),
      });
      cookies.set("user", res.data.item._doc._id, {
        expires: new Date(decoded.exp * 1000),
      });

      notification.success({
        message: "Successfully logged in.",
        placement: "bottomRight",
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
      if (
        error.response?.data ===
        "User with this email does not exist. Please signup"
      ) {
        notification.error({
          message: "User with this email does not exist.",
          placement: "bottomRight",
        });
      } else if (error.response?.data?.message === "Wrong password") {
        notification.error({
          message: "Wrong email or password.",
          placement: "bottomRight",
        });
      }
    }
  };

  return (
    <div className="home-container">
      {loggedIn ? (
        <Link to="/notes" style={{ textAlign: "center" }}>
          <img className="notesapplogo" src={notesapplogo} alt="Profile" />
        </Link>
      ) : (
        <img className="notesapplogo" src={notesapplogo} alt="Profile" />
      )}
      {loggedIn && (
        <p className="title">
          Hello {username}, <br /> MAKE THE MOST OF YOUR NOTES
        </p>
      )}
      {!loggedIn && <p className="title">MAKE THE MOST OF YOUR NOTES</p>}

      {!loggedIn && (
        <>
          <Link to="/register" className="regbutton">
            SIGN UP NOW
          </Link>
          <button
            onClick={() => setIsModalVisible(true)}
            className="loginbutton"
          >
            Log in
          </button>
          <Modal
            className="login-modal"
            footer={[]}
            open={isModalVisible}
            title="Log in"
            onCancel={handleCancel}
          >
            <label>Email:</label>
            <Input
              onChange={handleChangeEmail}
              className="input-login-left"
            ></Input>
            <label>Password:</label>
            <Input.Password
              onChange={handleChangePassword}
              className="input-login-right"
            ></Input.Password>

            <Button
              onClick={handleLogin}
              className="login-button"
              type="primary"
            >
              Log in
            </Button>
          </Modal>
        </>
      )}

      {loggedIn && (
        <Link to="/notes" className="startbutton">
          START WITH YOUR NOTES
        </Link>
      )}
    </div>
  );
};

export default Home;
