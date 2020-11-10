import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="input-label"><b>{label}</b></label>
      <input {...rest} name={name} id={name} className="form-control input-space" />
      {error && <div className="text-danger error-message"><b>{error}</b></div>}
    </div>
  );
};

export default Input;
