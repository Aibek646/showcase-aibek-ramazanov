import React from "react";

const education = (props) => {
  return (
    <div>
      <h1>{props.education}</h1>
      <p>{props.degree}</p>
      <p>{props.fieldOfStudy}</p>
      <p>{props.startYear}</p>
      <p>{props.endYear}</p>
      <p>{props.grade}</p>
      <p>{props.description}</p>
    </div>
  );
};

export default education;
