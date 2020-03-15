import React from "react";
import PropTypes from "prop-types";

const Input = ({ name, value, onChange, label, type, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={name}
        value={value}
        name={name}
        onChange={onChange}
      />
      {error && <small className="form-text text-muted">{error}</small>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default Input;
