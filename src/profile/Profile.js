import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Profile.css";

// eslint-disable-next-line no-unused-vars
export default function Profile(props) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <div className="titleLogin">
        <label className="titleLogin">Profile</label>
      </div>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <FormControl autoFocus disabled value="username" />
        </FormGroup>

        <Button block bsSize="large" type="submit">
          Logout
        </Button>
      </form>
      <div className="link">
        <a href="/">Index</a>
      </div>
    </div>
  );
}
