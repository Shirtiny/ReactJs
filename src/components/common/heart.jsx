import React from "react";

const Heart = ({ liked, clickFunc }) => {
  let classes = liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      className={classes}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
      onClick={clickFunc}
    ></i>
  );
};

export default Heart;
