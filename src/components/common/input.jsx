import React from "react";
import PropTypes from "prop-types";

//这里rest对象 表示将props里name、label、error以外的属性，装入名为rest的对象中
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input className="form-control" id={name} name={name} {...rest} />
      {error && <small className="form-text text-muted">{error}</small>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string
};

export default Input;
