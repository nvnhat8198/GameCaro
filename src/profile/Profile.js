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
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

// import Avatar from 'react-avatar-edit'

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
    window.location.reload();
  }

  function validateForm() {
    return email.length > 0 && fullname.length > 0;
  }

  const user = localStorage.getItem("fullname");
  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <Card border="primary">
      <div className="Login">
        <div className="titleLogin">
          <label className="titleLogin">Thông tin cá nhân</label>
        </div>

        {/* <div className="a-center">
        <Avatar
          width={150}
          height={150}
          // onCrop={this.onCrop}
          // onClose={this.onClose}
          // src={this.state.src}
        />
      </div> */}

        <form onSubmit={handleSubmit}>
          <FormLabel>Fullname</FormLabel>
          <FormGroup controlId="fullname">
            <FormControl
              // value={fullname}
              defaultValue={a}
              onChange={e => setFullname(e.target.value)}
              type="fullname"
            />
          </FormGroup>
          <FormLabel>Email</FormLabel>
          <FormGroup controlId="email">
            <FormControl
              // value={email}
              defaultValue={b}
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
          </FormGroup>

          <Navbar.Text>
            <FontAwesomeIcon icon={faUserCog} />
            <a href="/changepassword"> Đổi mật khẩu</a>
          </Navbar.Text>

          <Button
            block
            variant="outline-primary"
            disabled={!validateForm()}
            type="button"
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
