import React, { useState } from "react";
import { addOrUpdateEmail } from "../api/UserApi";
import FormTextField from "./FormTextField";

const EmailForm = ({ email }) => {

    const [newEmail, setNewEmail] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await addOrUpdateEmail(newEmail);
        if (response.success) alert("Email request sent");
    }

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
        <form className="EmailForm" onSubmit={submitHandler}>
            <label className="formTitle fw-bold">Email</label>
            <FormTextField
                type="email"
                label="Email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
            />
            <button className="btn-primary">Add new email</button>
        </form>
    )
}

export default EmailForm;