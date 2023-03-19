import React from "react";
import FormTextField from "./FormTextField";

const EmailForm = ({ email }) => {

    // change email form
    if (email) {
        return (
            <form className="EmailForm">
                <label className="formTitle fw-bold">Email</label>
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
            <button>Add new email</button>
        </form>
    )
}

export default EmailForm;