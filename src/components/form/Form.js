import React from "react";
import PropTypes from "prop-types";

const FormInput = ({
  name,
  type,
  placeholder,
  onChange,
  className,
  value,
  error,
  children,
  label,
  ref,
  accept,
  style,
  ...props
}) => {
  return (
    <React.Fragment>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        style={style}
      />
    </React.Fragment>
  );
};

FormInput.defaultProps = {
  type: "text",
  className: "",
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "password", "submit"]),
  className: PropTypes.string,
  value: PropTypes.any,
};

export default FormInput;
