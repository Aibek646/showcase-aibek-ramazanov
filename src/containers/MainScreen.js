import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import { compose } from "redux";
import Modal from "../components/UI/Modal";
import "./MainScreen.css";

class MainScreen extends Component {
  state = {
    universities: [],
    education: [],
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

  createEducationalList = () => {
    const { education } = this.state;
    const university = this.state.text;
    for (let key in this.state.orderForm) {
      education.push({
        value: this.state.orderForm[key].value,
      });
    }
    console.log(education);
  };

  fetchUniversities = (name) => {
    const searchURL = `http://universities.hipolabs.com/search?name=${name}`;
    axios
      .get(searchURL)
      .then((res) => {
        const resultNotFoundMsg = !res.data.length
          ? "There are no more search results. Please try again"
          : "";
        console.log(res.data);
        this.setState({
          universities: res.data,
          loading: false,
          message: resultNotFoundMsg,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          message: "Failed to fetch the data. Please check network",
        });
      });
  };

  onAutoTextChanged = (e) => {
    if (!e.target.value) {
      this.setState({
        text: e.target.value,
        universities: [],
        message: "",
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

  renderSuggestion2 = () => {
    const { universities } = this.state;
    if (universities.length === 0) {
      return null;
    }
    return (
      <ul>
        {universities.map((univer) => (
          <li
            onClick={() => {
              this.selectUniversity(univer.name);
            }}
            key={univer.id}
          >
            {univer.name}
          </li>
        ))}
      </ul>
    );
  };

  selectUniversity = (value) => {
    this.setState({
      text: value,
      universities: [],
    });
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
    this.setState({ modal: !this.state.modal, text: "" });
  };

  render() {
    const { text } = this.state;

    return (
      <div className="container">
        <h1>Welcome {this.props.name} to educational page</h1>
        <button onClick={this.openAndCloseModal}>Add new education</button>

        <br />

        <Modal
          text={text}
          renderSuggestion2={this.renderSuggestion2()}
          onAutoTextChanged={this.onAutoTextChanged}
          orderForm={this.state.orderForm}
          open={this.state.modal}
          close={this.openAndCloseModal}
          onChanged={this.onInputChanged}
          add={this.createEducationalList}
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
