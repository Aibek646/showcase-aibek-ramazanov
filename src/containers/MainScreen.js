import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import { compose } from "redux";
import Modal from "../components/UI/Modal";

class MainScreen extends Component {
  state = {
    universities: [],
    suggestion: [],
    text: "",
    message: "",
    loading: false,
    modal: false,
    orderForm: {
      degree: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Degree",
        },
        value: "",
      },
      fieldOfStudy: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Field of Study",
        },
        value: "",
      },
      startYear: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Start Year",
        },
        value: "",
      },
      endYear: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "End Year",
        },
        value: "",
      },
      grade: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Grade",
        },
        value: "",
      },
      description: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "description",
        },
        value: "",
      },
    },
  };

  onTextChanged = (e) => {
    const value = e.target.value;
    let updatedArray = [];
    const regex = new RegExp(`^${value}`, "i");
    updatedArray = this.state.universities.sort().filter((v) => regex.test(v));
    this.setState({
      suggestion: updatedArray,
      text: value,
    });
  };

  fetchUniversities = (name) => {
    const searchURL = `http://universities.hipolabs.com/search?name=${name}`;
    axios
      .get(searchURL)
      .then((res) => {
        console.log(res.data);
        this.setState({
          universities: res.data,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  onAutoTextChanged = (e) => {
    // const value = e.target.value;
    // let updatedArray = [];
    // if (value.length > 0) {
    //   const regex = new RegExp(`^${value}`, "i");
    //   updatedArray = this.state.universities
    //     .sort()
    //     .filter((v) => regex.test(v));
    // }

    // this.setState({
    //   suggestion: updatedArray,
    //   text: value,
    // });

    if (!e.target.value) {
      this.setState({
        text: e.target.value,
      });
    } else {
      this.setState(
        {
          text: e.target.value,
        },
        this.fetchUniversities(e.target.value)
      );
    }
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

  renderSuggestion2 = () => {
    const { universities } = this.state;
    if (universities.length === 0) {
      return null;
    }
    return (
      <ul>
        {universities.map((univer) => (
          <li key={univer.name}>{univer.name}</li>
        ))}
      </ul>
    );
  };

  onInputChanged = (e, inputIdentity) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentity],
    };
    updatedFormElement.value = e.target.value;
    updatedOrderForm[inputIdentity] = updatedFormElement;
    this.setState({
      orderForm: updatedOrderForm,
    });
  };

  openAndCloseModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { text } = this.state;

    return (
      <div>
        <h1>Welcome {this.props.name} to educational page</h1>
        <button onClick={this.openAndCloseModal}>Add new education</button>

        <br />
        <DebounceInput
          debounceTimeout={500}
          type="text"
          value={text}
          onChange={this.onAutoTextChanged}
        />

        <Modal
          orderForm={this.state.orderForm}
          open={this.state.modal}
          close={this.openAndCloseModal}
          onChanged={this.onInputChanged}
        />

        <div>{this.renderSuggestion2()}</div>
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
