import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Login.css";
// eslint-disable-next-line import/imports-first
import "bootstrap-css-only/css/bootstrap.min.css";
// eslint-disable-next-line import/imports-first
import "@fortawesome/fontawesome-free/css/all.min.css";

// eslint-disable-next-line no-unused-vars
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "https://api-1612457.herokuapp.com/user/login",
      // url: "http://localhost:3001/user/login",
      data: {
        Email: email,
        Password: password
      }
    })
      .then(res => {
        // eslint-disable-next-line no-alert
        alert("Đăng nhập thành công!");
        console.log(res);
        console.log(res.data.token);
        localStorage.setItem("fullname", res.data.user.FullName);
        window.location.reload();
      })
      .catch(err => {
        // eslint-disable-next-line no-alert
        alert("Đăng nhập không thành công!");
        console.log(err);
      });
  }

  const user = localStorage.getItem("fullname");
  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="Login">
      <div className="titleLogin">
        <label className="titleLogin">Login</label>
      </div>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
      <div className="link">
        <a href="/register">Register</a>
      </div>
      <div className="link">
        <a href="/">Index</a>
      </div>
    </div>
  );
}
