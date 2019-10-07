// eslint-disable-next-line max-classes-per-file
import React from "react";
import "../Caro.css";

class Square extends React.Component {
  render() {
    return this.props.win ? (
      <button type="button" className="square win" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    ) : (
      <button type="button" className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}
export default Square;
