import React from "react";

const Select = ({
  name,
  options,
  label,
  keyProperty,
  optionProperty,
  error,
  onChange,
  value
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        id={name}
        onChange={onChange}
        name={name}
        value={value}
      >
        <option value=""></option>
        {options.map(g => (
          <option key={g[keyProperty] || g} value={g[keyProperty]}>
            {g[optionProperty] || g}
          </option>
        ))}
      </select>
      {error && <small className="form-text text-muted">{error}</small>}
    </div>
  );
};

export default Select;
