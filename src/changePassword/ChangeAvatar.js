import React, { Component } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { Redirect } from "react-router-dom";
// import {useAlert} from "react-alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faBackward,
  faCloudUploadAlt
} from "@fortawesome/free-solid-svg-icons";
import "./ChangePassword";

class ChangeAvatar extends Component {
  state = {
    selectedFile: null,
    imagePreviewUrl: null,
    imageResize: null
  };

  fileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });

      Resizer.imageFileResizer(
        this.state.selectedFile,
        150,
        150,
        "JPEG",
        100,
        0,
        uri => {
          // console.log(uri);
          this.setState({
            imageResize: uri
          });
        },
        "base64"
      );
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  submit = () => {
    // var fd = new FormData();
    // fd.append('file', this.state.selectedFile);
    // var request = new XMLHttpRequest();

    console.log(this.state.imageResize);

    if (this.state.imageResize !== null && this.state.imageResize !== "") {
      axios({
        method: "post",
        url: "http://localhost:3001/changeavatar",
        data: {
          ID: localStorage.getItem("id"),
          Avatar: this.state.imageResize
        }
      })
        .then(res => {
          console.log(res);
          localStorage.removeItem("avatar");
          localStorage.setItem("avatar", this.state.imageResize);
          localStorage.setItem("changeAvatarSuccess", "changeAvatarSuccess");
          window.location.reload();
        })
        .catch(err => {
          // eslint-disable-next-line no-alert
          alert("Thay Avatar không thành công!");
          console.log(err);
        });
    } else {
      // eslint-disable-next-line no-alert
      alert("Xin mời chọn ảnh làm Avatar!");
    }

    // request.onreadystatechange = function() {
    //   if (this.readyState === 4 && this.status === 200) {
    //     alert('Uploaded!');
    //   }
    // };
    // request.open("POST", "https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload", true);
    // request.send(fd);
  };

  render() {
    // const alert = useAlert();

    const user = localStorage.getItem("fullname");
    if (!user || localStorage.getItem("id") === "0") {
      return <Redirect to="/" />;
    }
    const check = localStorage.getItem("changeAvatarSuccess");
    if (check) {
      localStorage.removeItem("changeAvatarSuccess");
      return <Redirect to="/profile" />;
    }

    let $imagePreview = (
      <div className="previewText image-container">Vui lòng chọn ảnh!</div>
    );
    if (this.state.imagePreviewUrl) {
      $imagePreview = (
        <div className="image-container">
          <img src={this.state.imagePreviewUrl} alt="icon" width="300" />
        </div>
      );
    }

    return (
      <Card border="primary">
        <div className="avt">
          <div className="titleLogin">
            <label className="titleLogin">Thay Avatar</label>
          </div>
          {/* <input type="file" className="custom-input"  name="avatar" onChange={this.fileChangedHandler} /> */}
          <p className="file">
            <input
              type="file"
              name="avatar"
              id="file"
              onChange={this.fileChangedHandler}
              accept="image/*"
            />
            <label htmlFor="file">
              <FontAwesomeIcon icon={faCloudUploadAlt} /> Chọn ảnh
            </label>
          </p>

          <br />
          <div className="imgPrev">{$imagePreview}</div>
          <a href="/profile">
            <button type="button" className="btnPrev">
              <FontAwesomeIcon icon={faBackward} /> Trở về
            </button>
          </a>
          <button type="button" className="btnUpload" onClick={this.submit}>
            <FontAwesomeIcon icon={faCheck} /> Lưu
          </button>
        </div>
      </Card>
    );
  }
}

export default ChangeAvatar;
