import React from "react";
import FormTextField from "./FormTextField";

const EmailForm = ({ email }) => {

    // change email form
    if (email) {
        return (
            <form className="EmailForm">
                <label className="formTitle fw-bold">Email</label>
                <FormTextField
                    type="email"
                    placeholder={email}
                />
                <button className="btn-primary mt-2">Change email</button>
            </form>
        )
    }

    return (
        <form className="EmailForm">
            <label className="formTitle fw-bold">Email</label>
            <FormTextField
                type="email"
                label="Email"
            />
            <button className="btn-primary">Add new email</button>
        </form>
    )
}

export default EmailForm;