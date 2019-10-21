import React from "react";
import "./Doashboard.css"
const Doashboard = ()=>{
    return(
        <div className="doashboard" >
        <h1>welcome</h1>
        <form>
        <button className="btn"formAction="/login">Đăng nhập</button>
        <button className="btn"formAction="/register">Đăng kí</button>
        <button className="btn"formAction="/profile">Trang chủ</button>
        <button className="btn" formAction="/caro">Game Caro</button>
        </form>
        </div>
    )
}

export default Doashboard;