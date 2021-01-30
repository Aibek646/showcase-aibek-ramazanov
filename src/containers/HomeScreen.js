import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomeScreen extends Component {
  state = {
    name: "",
  };

  onNameEntered = (e) => {
    this.setState({ name: e.target.value });
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

export default HomeScreen;
