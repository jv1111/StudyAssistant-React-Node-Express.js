import React from "react";

const FormTextField = ({ label, name, ...inputProps }) => {
    const inputId = inputProps.id || name;

    return (
        <div className="inputBox">
            <input
                id={inputId}
                name={name}
                placeholder=" "
                required
                {...inputProps}
            />
            <label className="inputLabel" htmlFor={inputId}>{label}</label>
        </div>
    );
}

export default FormTextField;
