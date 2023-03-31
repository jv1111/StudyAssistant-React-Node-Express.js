import React, { useState } from "react";
import { FormTextField } from "../../components";
import { resetPassRequestApi } from "../../api/UserApi";

const ForgotPassPage = () => {

    const [email, setEmail] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault()
        const response = await resetPassRequestApi(email);
    }

    return (
        <div className="forgot-pass-page">
            <form className="forgot-pass-form" onSubmit={submitHandler}>
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
                >
                    Send request
                </button>
            </form>
        </div>
    );
}

export default ForgotPassPage;