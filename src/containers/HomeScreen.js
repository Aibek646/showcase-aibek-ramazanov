import React, { Component } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import "./HomeScreen.css";

class HomeScreen extends Component {
  onNameEntered = (e) => {
    this.props.onTypedName(e.target.value);
  };
  onClickedButton = () => {
    this.props.history.push("/mainscreen");
  };

  render() {
    return (
      <div className="main-page">
        <h1>Hi there! Welcome to your education showcase</h1>
        <h1>Type your name and click "Enter" below to begin!</h1>
        <input onChange={this.onNameEntered} placeholder="Your Name" />
        <button onClick={this.onClickedButton}>Enter</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTypedName: (name) => dispatch(actions.addName(name)),
  };
};

export default connect(null, mapDispatchToProps)(HomeScreen);
