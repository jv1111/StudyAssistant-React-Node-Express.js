import React from "react";
import { Formik, Form } from "formik";
import FormikTextField from "./FormikTextField";
import ChangePassValidationSchema from "../validation/ChangePassValidationSchema";
import { changePass } from "../api/UserApi.js";

const ChangePassForm = () => {

    const initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    }

    const submitHandler = async (data, resetForm) => {
        const response = await changePass(data);
        if (response.error) return alert(response.error);
        alert("password changed");
        resetForm();
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ChangePassValidationSchema}
            onSubmit={async (data, { setSubmitting, resetForm }) => {
                await submitHandler(data, resetForm);
                setSubmitting(false);//Enable submit button
            }}
        >
            {({ isSubmitting }) => (
                <Form className="changePassForm">
                    <label className="formTitle fw-bold">Change password</label>
                    <FormikTextField
                        type="password"
                        name="oldPassword"
                        label='Old password'
                    />
                    <FormikTextField
                        type="password"
                        name="newPassword"
                        label='New password'
                    />
                    <FormikTextField
                        type="password"
                        name="confirmPassword"
                        label='Confirm password'
                    />
                    <button
                        className="btn-primary"
                        type="submit"
                        disabled={isSubmitting}//disable the button when submitting
                    >
                        Change password
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default ChangePassForm;