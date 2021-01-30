import React, { Component } from "react";
import { Link } from "react-router-dom";
import actions from "../store/actions/index";
import { connect } from "react-redux";

class HomeScreen extends Component {
  state = {
    name: "",
  };

  onNameEntered = (e) => {
    this.setState({ name: e.target.value });
    this.props.onTypedName(e.target.value);
  };

  render() {
    return (
      <div>
        <h1>Hi there! Welcome to your education showcase</h1>
        <h1>Type your name and click "Enter" below to begin!</h1>
        <input onChange={this.onNameEntered} placeholder="Your Name" />
        <button>Enter</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.homeScreen.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTypedName: (name) => dispatch(actions.addName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
