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
      updatedArray = this.state.universities
        .sort()
        .filter((v) => regex.test(v));
    } else if (value.length <= 0) {
      return this.setState({ suggestion: [] });
    }

    this.setState({
      suggestion: updatedArray,
      text: value,
    });
  };

  suggestionSelected = (value) => {
    this.setState({
      text: value,
      suggestion: [],
    });
  };

  renderSuggestions = () => {
    const { suggestion } = this.state;
    if (suggestion.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestion.map((univer) => (
          <li>{univer}</li>
        ))}
      </ul>
    );
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <h1>Welcome {this.props.name} to educational page</h1>
        <button>Add new education</button>
        <br />
        <input type="text" value={text} onChange={this.onTextChanged} />
        <div>{this.renderSuggestions()}</div>
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
