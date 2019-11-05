import React, { useState } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Card
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useAlert } from "react-alert";
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

  const alert = useAlert();

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "https://apicaroonline-1612457.herokuapp.com/user/register",
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
        alert.success(res.data);
        if (res.data === "Đăng kí thành công!") {
          localStorage.setItem("RegisterSuccess", "RegisterSuccess");
          setTimeout(window.location.reload.bind(window.location), 3000);
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-alert
        alert.show("Đăng kí lỗi!");
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
    <Card border="primary">
      <div className="Login">
        <div className="titleLogin">
          <label className="titleLogin">Đăng kí</label>
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
          <Button
            block
            variant="outline-primary"
            disabled={!validateForm()}
            type="submit"
          >
            Đăng kí
          </Button>
        </form>
        <div className="link">
          <a href="/login">Đăng nhập</a>
        </div>
        <div className="link">
          <a href="/">Home</a>
        </div>
      </div>
    </Card>
  );
}
