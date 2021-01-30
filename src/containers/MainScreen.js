import React, { Component } from "react";
import { connect } from "react-redux";

class MainScreen extends Component {
  render() {
    return (
      <div>
        <h1>Welcome {this.props.name} to educational page</h1>
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
