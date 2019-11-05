import React, { useState } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Navbar,
  Card
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog, faCogs } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

import logo from "../images/avatar-default.jpg";

// eslint-disable-next-line no-unused-vars
export default function Profile(props) {
  const a = localStorage.getItem("fullname") || "";
  const b = localStorage.getItem("email") || "";
  const [email, setEmail] = useState(b);
  const [fullname, setFullname] = useState(a);

  function validateForm() {
    return email.length > 0 && fullname.length > 0;
  }

  function hiddenElement() {
    if (localStorage.getItem("id") === "0") return true;
  }
  const alert = useAlert();

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "https://apicaroonline-1612457.herokuapp.com/changeinfo",
      // url: "http://localhost:3001/changeinfo",
      data: {
        ID: localStorage.getItem("id"),
        FullName: fullname,
        Email: email
      }
    })
      .then(res => {
        console.log(res);
        // eslint-disable-next-line no-alert
        if (res.data === "Cập nhật thông tin thành công!") {
          localStorage.removeItem("fullname");
          localStorage.removeItem("email");
          localStorage.removeItem("id");
          localStorage.removeItem("avatar");
          // eslint-disable-next-line no-alert
          alert.success("Cập nhật thành công, về trang chủ!");
          setTimeout(window.location.reload.bind(window.location), 2500);
        } else {
          // eslint-disable-next-line no-alert
          alert.show(res.data);
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-alert
        alert.show("Đã xảy ra lỗi");
        console.log(err);
      });
  }

  function logout() {
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("avatar");
    window.location.reload();
  }

  const user = localStorage.getItem("fullname");
  if (!user) {
    return <Redirect to="/" />;
  }

  const img = localStorage.getItem("avatar");
  function hiddenImg() {
    if (img !== "" && img !== "null") return true;
  }
  const avatar =
    img === "" || img === "null" ? (
      <div hidden />
    ) : (
      <div hidden={!hiddenImg()} className="imgAvatar">
        <img src={img} alt="logo" />
      </div>
    );
  return (
    <Card border="primary">
      <div className="Login">
        <div className="titleLogin">
          <label className="titleLogin">Thông tin cá nhân</label>
        </div>
        <div hidden={hiddenImg()} className="imgAvatar">
          <img src={logo} alt="logo" />
        </div>
        {avatar}

        <div hidden={hiddenElement()} className="link">
          <a href="/changeavatar">
            <FontAwesomeIcon icon={faCogs} /> Đổi Avatar
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <FormLabel>Fullname</FormLabel>
          <FormGroup controlId="fullname">
            <FormControl
              value={fullname}
              onChange={e => setFullname(e.target.value)}
              type="fullname"
              readOnly={hiddenElement()}
            />
          </FormGroup>
          <FormLabel>Email</FormLabel>
          <FormGroup controlId="email">
            <FormControl
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              readOnly={hiddenElement()}
            />
          </FormGroup>

          <Navbar.Text hidden={hiddenElement()}>
            <a href="/changepassword">
              <FontAwesomeIcon icon={faUserCog} /> Đổi mật khẩu
            </a>
          </Navbar.Text>

          <Button
            block
            variant="outline-primary"
            disabled={!validateForm()}
            type="submit"
            hidden={hiddenElement()}
          >
            Lưu thay đổi
          </Button>

          <Button
            block
            variant="outline-secondary"
            type="button"
            onClick={logout}
          >
            Đăng xuất
          </Button>
        </form>
        <div className="link">
          <a href="/">Home</a>
        </div>
      </div>
    </Card>
  );
}
