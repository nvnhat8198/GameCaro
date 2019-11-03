import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import "./GGFBLogin.css";

class GGFBLogin extends Component {
  state = {
    isLoggedIn: false,
    ID: "",
    FullName: "",
    Email: "",
    Avatar: ""
  };

  render() {
    const responseFacebook = response => {
      console.log(response);
      if (response.userID) {
        this.setState({
          isLoggedIn: true,
          ID: 0,
          FullName: response.name,
          Email: response.email,
          Avatar: response.picture.data.url
        });
        localStorage.setItem("fullname", this.state.FullName);
        localStorage.setItem("email", this.state.Email);
        localStorage.setItem("id", this.state.ID);
        localStorage.setItem("avatar", this.state.Avatar);
        window.location.reload();
      }
    };

    const responseGoogle = response => {
      console.log(response);
      if (response.w3.Eea) {
        this.setState({
          isLoggedIn: true,
          ID: 0,
          FullName: response.w3.ig,
          Email: response.w3.U3,
          Avatar: response.w3.Paa
        });
        localStorage.setItem("fullname", this.state.FullName);
        localStorage.setItem("email", this.state.Email);
        localStorage.setItem("id", this.state.ID);
        localStorage.setItem("avatar", this.state.Avatar);
        window.location.reload();
      }
    };

    return (
      <div className="GGFB">
        <div>
          <FacebookLogin
            appId="595446160953037" // APP ID NOT CREATED YET
            fields="name,email,picture"
            callback={responseFacebook}
            textButton=""
            icon="fa-facebook"
            cssClass="iconFB"
          />
        </div>

        <div>
          <GoogleLogin
            clientId="25071415689-ovsp1306qne7q4a2brrh8ohej671uk4l.apps.googleusercontent.com" // CLIENTID NOT CREATED YET
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            buttonText=""
            className="iconGG"
            icon
          />
        </div>
      </div>
    );
  }
}

export default GGFBLogin;
