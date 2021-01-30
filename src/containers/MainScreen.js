import React, { Component } from "react";
import { connect } from "react-redux";

class MainScreen extends Component {
  state = {
    universities: ["yale", "harvard", "cambridge", "MIT"],
    suggestion: [],
    text: "",
  };

  onTextChanged = (e) => {
    const value = e.target.value;
    let updatedArray = this.state.suggestion;
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      updatedArray = this.state.universities.sort().filter((v) => {
        regex.test(v);
      });
      this.setState({
        suggestion: updatedArray,
        text: value,
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Welcome {this.props.name} to educational page</h1>
        <button>Add new education</button>
        <input />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.homeScreen.name,
  };
};

export default connect(mapStateToProps)(MainScreen);
