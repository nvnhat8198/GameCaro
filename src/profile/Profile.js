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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog, faCogs } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

import logo from "../images/avatar-default.jpg";

// eslint-disable-next-line no-unused-vars
export default function Profile(props) {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");

  const a = localStorage.getItem("fullname") || "";
  const b = localStorage.getItem("email") || "";

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("avatar");
    window.location.reload();
  }

  // function abc(){
  //   console.log(email)
  // }

  function validateForm() {
    if (email.length > 0 && fullname.length > 0) {
      return true;
    }
    // return  (email.length>0 && fullname.length>0);
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

        <div className="link">
          <a href="/changeavatar">
            <FontAwesomeIcon icon={faCogs} /> Đổi Avatar
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <FormLabel>Fullname</FormLabel>
          <FormGroup controlId="fullname">
            <FormControl
              defaultValue={a}
              onChange={e => setFullname(e.target.value)}
              type="fullname"
            />
          </FormGroup>
          <FormLabel>Email</FormLabel>
          <FormGroup controlId="email">
            <FormControl
              defaultValue={b}
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
          </FormGroup>

          <Navbar.Text>
            <a href="/changepassword">
              <FontAwesomeIcon icon={faUserCog} /> Đổi mật khẩu
            </a>
          </Navbar.Text>

          <Button
            block
            variant="outline-primary"
            disabled={!validateForm()}
            type="button"
            // onClick={abc}
          >
            Lưu thay đổi
          </Button>

          <Button block variant="outline-secondary" type="submit">
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
