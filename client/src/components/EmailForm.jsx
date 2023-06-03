import React, { useState } from "react";
import { addOrUpdateEmail } from "../api/UserApi";
import FormTextField from "./FormTextField";

const EmailForm = ({ email }) => {

    const [newEmail, setNewEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setSubmitting(true);//disable the submit button
        const response = await addOrUpdateEmail(newEmail);
        if (response.error) {
            setEmailError(response.error)
            setTimeout(() => {
                setEmailError("");
            }, 5000)//reset the error message after 5 seconds
        }
        if (response.success) alert("Email request sent");
        setTimeout(() => {
            setSubmitting(false);//enable submitting button
        }, 5000);
    }

    // change email form
    if (email) {
        return (
            <form className="emailForm" onSubmit={submitHandler}>
                <div className="formTitle">
                    <label className="formTitle fw-bold">Email</label>
                    <label className="errorMessage">{emailError}</label>
                </div>
                <FormTextField
                    type="email"
                    onChange={e => setNewEmail(e.target.value)}
                    value={newEmail}
                    placeholder={email}
                />
                <label className="errorMessage">{emailError}</label>
                <button
                    type="submit"
                    className="btn-primary mt-2"
                    disabled={submitting}
                >
                    Change email
                </button>
            </form>
        )
    }

    return (
        <form className="emailForm" onSubmit={submitHandler}>
            <div className="formTitle">
                <label className="formTitle fw-bold">Email</label>
                <label className="errorMessage">{emailError}</label>
            </div>
            <FormTextField
                type="email"
                label="Email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
            />
            <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
            >
                Add new email
            </button>
        </form>
    )
}

export default EmailForm;