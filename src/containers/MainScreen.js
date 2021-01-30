import React, { Component } from "react";
import { connect } from "react-redux";

class MainScreen extends Component {
  state = {
    universities: ["yale", "harvard", "cambridge", "MIT"],
    suggestion: [],
    text: "",
  };

  componentDidMount() {}

  onTextChanged = (e) => {
    const value = e.target.value;
    let updatedArray = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      updatedArray = this.state.universities
        .sort()
        .filter((v) => regex.test(v));
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
          <li key={univer} onClick={() => this.suggestionSelected(univer)}>
            {univer}
          </li>
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
