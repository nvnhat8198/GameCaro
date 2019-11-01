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
import "./ChangePassword.css";
// eslint-disable-next-line import/imports-first
import axios from "axios";

// eslint-disable-next-line no-unused-vars
export default function ChangePassword(props) {
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  function validateForm() {
    return (
      curPassword.length > 0 &&
      newPassword.length > 0 &&
      confPassword.length > 0 &&
      newPassword === confPassword
    );
  }
  const alert = useAlert();

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3001/changepassword",
      data: {
        ID: localStorage.getItem("id"),
        CurPassword: curPassword,
        NewPassword: newPassword
      }
    })
      .then(res => {
        console.log(res);
        // console.log(res.data);
        // eslint-disable-next-line no-alert
        if (res.data === "Đổi mật khẩu thành công!") {
          localStorage.removeItem("fullname");
          localStorage.removeItem("email");
          localStorage.removeItem("id");
          localStorage.removeItem("avatar");
          // eslint-disable-next-line no-alert
          alert.success("Đổi mật khẩu thành công, về trang chủ!");
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
  const user = localStorage.getItem("fullname");
  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <Card border="primary">
      <div className="Login">
        <div className="titleLogin">
          <label className="titleLogin">Đổi mật khẩu</label>
        </div>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="curPassword">
            <FormLabel>Mật khẩu hiện tại</FormLabel>
            <FormControl
              autoFocus
              value={curPassword}
              onChange={e => setCurPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="newPassword">
            <FormLabel>Mật khẩu mới</FormLabel>
            <FormControl
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="confPassword">
            <FormLabel>Xác nhận mật khẩu</FormLabel>
            <FormControl
              value={confPassword}
              onChange={e => setConfPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button
            block
            variant="outline-primary"
            disabled={!validateForm()}
            type="submit"
          >
            Đổi mật khẩu
          </Button>
        </form>
        <div className="link">
          <a href="/profile">Thông tin cá nhân</a>
        </div>
        <div className="link">
          <a href="/">Home</a>
        </div>
      </div>
    </Card>
  );
}
