import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import { compose } from "redux";

class MainScreen extends Component {
  state = {
    universities: [],
    suggestion: [],
    text: "",
    message: "",
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

  fetchUniversities = (name) => {
    const searchURL = `http://universities.hipolabs.com/search?name=${name}/update.json`;
    axios
      .get(searchURL)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  onTextChanged = (e) => {
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
    this.setState({
      text: e.target.value,
    });
    this.fetchUniversities(e.target.value);
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
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let input = (
      <form>
        {formElementsArray.map((formElement) => (
          <input
            key={formElement.id}
            type={formElement.config.elementType}
            value={formElement.config.value}
          />
        ))}
      </form>
    );

    return (
      <div>
        <h1>Welcome {this.props.name} to educational page</h1>
        <button>Add new education</button>
        <br />
        <DebounceInput
          debounceTimeout={500}
          type="text"
          value={text}
          onChange={this.onTextChanged}
        />
        {input}

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
