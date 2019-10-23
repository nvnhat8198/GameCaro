import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Register.css";
// eslint-disable-next-line import/imports-first
import axios from "axios";

// eslint-disable-next-line no-unused-vars
export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && fullname.length > 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "https://api-1612457.herokuapp.com/user/register",
      // url: "http://localhost:3001/user/register",
      data: {
        FullName: fullname,
        Email: email,
        Password: password
      }
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        // eslint-disable-next-line no-alert
        alert(res.data);
        if (res.data === "Đăng kí thành công!") {
          localStorage.setItem("RegisterSuccess", "RegisterSuccess");
          window.location.reload();
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-alert
        alert("Đăng kí lỗi!");
        console.log(err);
      });
  }
  const user = localStorage.getItem("fullname");
  if (user) {
    return <Redirect to="/" />;
  }
  const success = localStorage.getItem("RegisterSuccess");
  if (success) {
    localStorage.removeItem("RegisterSuccess");
    return <Redirect to="/login" />;
  }

  return (
    <div className="Login">
      <div className="titleLogin">
        <label className="titleLogin">Register</label>
      </div>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="fullname">
          <FormLabel>Fullname</FormLabel>
          <FormControl
            autoFocus
            value={fullname}
            onChange={e => setFullname(e.target.value)}
            type="fullname"
          />
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
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
          Register
        </Button>
      </form>
      <div className="link">
        <a href="/login">Login</a>
      </div>
      <div className="link">
        <a href="/">Index</a>
      </div>
    </div>
  );
}
