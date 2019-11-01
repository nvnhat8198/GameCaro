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
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./Login.css";
// eslint-disable-next-line import/imports-first
import "bootstrap-css-only/css/bootstrap.min.css";
// eslint-disable-next-line import/imports-first
import "@fortawesome/fontawesome-free/css/all.min.css";

// eslint-disable-next-line no-unused-vars
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3001/user/login",
      data: {
        Email: email,
        Password: password
      }
    })
      .then(res => {
        alert.success("Đăng nhập thành công!");
        console.log(res);
        console.log(res.data.token);
        localStorage.setItem("fullname", res.data.user.FullName);
        localStorage.setItem("email", res.data.user.Email);
        localStorage.setItem("id", res.data.user.ID);
        localStorage.setItem("avatar", res.data.user.Avatar);
        setTimeout(window.location.reload.bind(window.location), 2500);
      })
      .catch(err => {
        alert.show("Đăng nhập không thành công!");
        console.log(err);
      });
  }

  function loginFB() {
    axios({
      method: "post",
      url: "http://localhost:3001/auth/facebook/"
    })
      .then(res => {
        // eslint-disable-next-line no-alert
        alert("Đăng nhập thành công!");
        console.log(res);
        console.log(res.data.token);
        localStorage.setItem("fullname", res.data.user.FullName);
        localStorage.setItem("email", "Không có");
        localStorage.setItem("id", res.data.user.ID);
        // window.location.reload();
      })
      .catch(err => {
        // eslint-disable-next-line no-alert
        alert.show("Đăng nhập không thành công!");
        console.log(err);
      });
  }

  function loginGG() {
    // axios({
    //   method: "get",
    //   url: "http://localhost:3001/auth/google"
    // })
    //   .then(res => {
    //     // eslint-disable-next-line no-alert
    //     alert.success("Đăng nhập thành công!");
    //     console.log(res);
    //     console.log(res.data.token);
    //     // localStorage.setItem("fullname", res.data.user.FullName);
    //     // window.location.reload();
    //   })
    //   .catch(err => {
    //     // eslint-disable-next-line no-alert
    //     alert.show("Đăng nhập không thành công!");
    //     console.log(err);
    //   });

    window.location.href("http://localhost:3001/auth/facebook");
  }

  const user = localStorage.getItem("fullname");
  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <Card border="primary">
      <div className="Login">
        <div className="titleLogin">
          <label className="titleLogin">Đăng nhập</label>
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
          <Button
            block
            variant="outline-primary"
            disabled={!validateForm()}
            type="submit"
          >
            Đăng nhập
          </Button>
        </form>
        <div className="link">
          <button className="iconFB" onClick={loginFB}>
            <FontAwesomeIcon icon={faFacebookF} />
          </button>
          {/* <a href="http://localhost:3001/auth/facebook/"></a> */}
          <button className="iconGG" onClick={loginGG}>
            <FontAwesomeIcon icon={faGoogle} />
          </button>
        </div>

        <div className="link">
          <a href="/register">Đăng kí</a>
        </div>
        <div className="link">
          <a href="/">Home</a>
        </div>
      </div>
    </Card>
  );
}
