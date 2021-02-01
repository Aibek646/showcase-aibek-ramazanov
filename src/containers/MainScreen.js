import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../store/actions/index";
import Modal from "../components/UI/Modal";
import "./MainScreen.css";

class MainScreen extends Component {
  state = {
    universities: [],
    educations: [],
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
    const { educations } = this.state;
    const university = this.state.text;

    educations.push({
      degree: this.state.orderForm.degree.value,
      fieldOfStudy: this.state.orderForm.fieldOfStudy.value,
      startYear: this.state.orderForm.startYear.value,
      endYear: this.state.orderForm.endYear.value,
      grade: this.state.orderForm.grade.value,
      description: this.state.orderForm.description.value,
      university: university,
    });

    this.setState(
      {
        educations: educations,
      },
      this.openAndCloseModal
    );
    console.log(this.state.education);
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
        // this.fetchUniversities(e.target.value)
        this.props.onFetchUniversities(e.target.value)
      );
    }
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
    for (let key in this.state.orderForm) {
      this.state.orderForm[key].value = "";
    }
    this.setState({ modal: !this.state.modal, text: "", universities: [] });
  };

  render() {
    const { text } = this.state;

    return (
      <div>
        <h1>Welcome {this.props.name} to educational page</h1>
        <button className="btn-add-education" onClick={this.openAndCloseModal}>
          Add new education
        </button>

        <br />

        <div className="big-container">
          <div className="container-1">
            {this.state.educations.map((education) => (
              <ul>
                <li>{education.university}</li>
              </ul>
            ))}
          </div>

          <div className="container-2">
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

            {this.state.educations.map((education) => (
              <div className="educational-modal">
                <p style={{ fontSize: "20px" }}>{education.university}</p>
                <p>{education.degree}</p>
                <p>{education.description}</p>
                <p>{education.fieldOfStudy}</p>
                <p>{education.grade}</p>
                <p>{education.startYear}</p>
                <p>{education.endYear}</p>
              </div>
            ))}
          </div>
        </div>
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
    onFetchUniversities: (name) => dispatch(actions.fetchUniversities(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
