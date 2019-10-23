import React from "react";
import "./Doashboard.css";

const Doashboard = () => {
  return (
    <div className="doashboard">
      <h1>welcome</h1>
      <button type="button" className="btnDoashboard">
        <a href="/login">Đăng nhập</a>
      </button>
      <button type="button" className="btnDoashboard">
        <a href="/register">Đăng kí</a>
      </button>
      <button type="button" className="btnDoashboard">
        <a href="/profile">Trang chủ</a>
      </button>
      <button type="button" className="btnDoashboard">
        <a href="/caro">Game Caro</a>
      </button>
    </div>
  );
};

export default Doashboard;
