import { Input, Button, notification, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import moment from "moment";

const Register = () => {
  const navigate = useNavigate();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [confpassword, setConfPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const handleRegister = async () => {
    try {
      if (!username) {
        notification.error({
          message: "Please enter username.",
          duration: 2,
          placement: "bottomRight",
        });
        return;
      }
      if (!email) {
        notification.error({
          message: "Please enter email.",
          duration: 2,
          placement: "bottomRight",
        });
        return;
      }
      if (!password) {
        notification.error({
          message: "Please enter password.",
          duration: 2,
          placement: "bottomRight",
        });
        return;
      }
      if (password.length < 8) {
        notification.error({
          message: "Password needs to be longer than 8 characters.",
          duration: 2,
          placement: "bottomRight",
        });
        return;
      }
      if (!confpassword) {
        notification.error({
          message: "Please confirm password.",
          duration: 2,
          placement: "bottomRight",
        });
        return;
      }
      if (password !== confpassword) {
        notification.error({
          message: "Password and confirmation are not same.",
          duration: 2,
          placement: "bottomRight",
        });
        return;
      }

      let data = { password, email, username, phoneNumber };

      const res = await Axios.post(`${SERVER_URL}/register`, data);

      notification.success({
        message: "Profile is created successfully.",
        placement: "bottomRight",
      });

      navigate("/");
    } catch (error) {
      if (
        error.response.data.message ===
        "User validation failed: email: Please enter a valid email"
      ) {
        notification.error({
          message: "Please enter valid email.",
          placement: "bottomRight",
        });
      }

      if (
        error.response.data.code === 11000 &&
        error.response.data.keyPattern.email === 1
      ) {
        notification.error({
          message: "This email address is already registered.",
          placement: "bottomRight",
        });
      }
    }
  };

  const handleChangeUsername = (e) => {
    setUsername(e);
  };

  const handleChangeEmail = (e) => {
    setEmail(e);
  };

  const handleChangePassword = (e) => {
    setPassword(e);
  };

  const handleChangeConfPassword = (e) => {
    setConfPassword(e);
  };

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e);
  };

  return (
    <div className="register-container">
      <p className="title">REGISTER NOW</p>
      <label>Username:</label>
      <Input
        onChange={(e) => {
          handleChangeUsername(e.target.value);
        }}
        className="input-register-left"
      ></Input>
      <label>Email:</label>
      <Input
        onChange={(e) => {
          handleChangeEmail(e.target.value);
        }}
        className="input-register-right"
      ></Input>
      <label>Phone number:</label>
      <Input
        onChange={(e) => {
          handleChangePhoneNumber(e.target.value);
        }}
        className="input-register-left"
      ></Input>
      <label>Password:</label>
      <Input.Password
        onChange={(e) => {
          handleChangePassword(e.target.value);
        }}
        className="input-register-right"
      ></Input.Password>
      <label>Confirm password:</label>
      <Input.Password
        onChange={(e) => {
          handleChangeConfPassword(e.target.value);
        }}
        className="input-register-left"
      ></Input.Password>

      <Button
        onClick={handleRegister}
        className="register-button"
        type="primary"
      >
        Register
      </Button>
    </div>
  );
};

export default Register;
