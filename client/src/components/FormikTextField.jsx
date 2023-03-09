import React from 'react';
import { ErrorMessage, useField } from 'formik';

const FormikTextField = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="inputBox">
            <input
                required='required'
                {...props}
                {...field}
            />

            <label className={
                `inputLabel ${meta.error && meta.touched && 'hide'}`
            }>
                {props.label}
            </label>

            <ErrorMessage component="label" name={field.name} className="errorMessage" />
            <div className="line" />
        </div>
    );
}

export default FormikTextField;