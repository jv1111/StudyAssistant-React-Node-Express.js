import React, { useState } from "react";
import { FormTextField } from "../../components";
import { resetPassRequestApi } from "../../api/UserApi";

const ForgotPassPage = () => {

    const [email, setEmail] = useState("");
    const [sending, setSending] = useState("");
    const [errorMessage, setErrorMessage] = useState(true);

    const submitHandler = async (e) => {
        e.preventDefault();
        setSending(true);
        const response = await resetPassRequestApi(email);
        if (response.error) {
            setErrorMessage(response.error);
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
        if (response.success) alert("Email sent");
        setSending(false);
    }

    return (
        <div className="forgotPassPage page">
            <form className="forgotPassForm" onSubmit={submitHandler}>
                <p className="description">
                    Request password link will be sent to your email
                </p>
                <FormTextField
                    label="Enter your email here"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button
                    className="btn-primary mt-1 w-100"
                    type="submit"
                    disabled={sending}
                >
                    Send request
                </button>
                <label className="errorMessage">{errorMessage}</label>
            </form>
        </div>
    );
}

export default ForgotPassPage;