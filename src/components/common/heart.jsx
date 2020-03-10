import React from "react";

const Heart = props => {
  let classes = props.liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      className={classes}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
      onClick={props.clickFunc}
    ></i>
  );
};

export default Heart;
