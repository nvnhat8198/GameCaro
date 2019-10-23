import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Profile.css";
import { Redirect } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
export default function Profile(props) {
  const fullname = localStorage.getItem("fullname") || "";
  function handleSubmit(event) {
    event.preventDefault();
    localStorage.removeItem("fullname");
    window.location.reload();
  }
  const user = localStorage.getItem("fullname");
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="Login">
      <div className="titleLogin">
        <label className="titleLogin">Full Name</label>
      </div>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="fullname">
          <FormControl disabled value={fullname} />
        </FormGroup>

        <Button block type="submit">
          Logout
        </Button>
      </form>
      <div className="link">
        <a href="/">Index</a>
      </div>
    </div>
  );
}
