import React from "react";
import { Card } from "react-bootstrap";
import "./Doashboard.css";

const Doashboard = () => {
  const check = localStorage.getItem("fullname") ? (
    <div className="doashboard">
      <h1 className="titleGame">Caro Online</h1>
      <button type="button" className="btnDoashboard">
        <a href="/profile">Thông tin cá nhân</a>
      </button>
      <button type="button" className="btnDoashboard">
        <a href="/caro">Game Caro vs Máy</a>
      </button>
    </div>
  ) : (
    <div className="doashboard">
      <h1 className="titleGame">Caro Online</h1>
      <button type="button" className="btnDoashboard">
        <a href="/login">Đăng nhập</a>
      </button>
      <button type="button" className="btnDoashboard">
        <a href="/register">Đăng kí</a>
      </button>
    </div>
  );
  return (
    <Card border="primary">
      <div>{check}</div>
    </Card>
    // <div className="doashboard">
    //   <h1>welcome</h1>
    //   <button type="button" className="btnDoashboard">
    //     <a href="/login">Đăng nhập</a>
    //   </button>
    //   <button type="button" className="btnDoashboard">
    //     <a href="/register">Đăng kí</a>
    //   </button>
    //   <button type="button" className="btnDoashboard">
    //     <a href="/profile">Trang chủ</a>
    //   </button>
    //   <button type="button" className="btnDoashboard">
    //     <a href="/caro">Game Caro</a>
    //   </button>
    // </div>
  );
};

export default Doashboard;
