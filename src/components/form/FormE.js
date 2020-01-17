import React from "react";
import PropTypes from "prop-types";
import emailPropType from "email-prop-type";

const FormInputE = ({
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

FormInputE.defaultProps = {
    type: "text",
    className: "",
};

FormInputE.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(["text", "number", "password", "submit"]),
    className: PropTypes.string,
    value: emailPropType.isRequired,
};

export default FormInputE;
