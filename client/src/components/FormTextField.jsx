import React from "react";

const FormTextField = (props) => {
    return (
        <div className="inputBox">
            <input
                required="required"
                {...props}
            />
            <label className="inputLabel">
                {props.label}
            </label>
            <div className="line" />
        </div>
    );
}

export default FormTextField;