import React, { useState, useEffect } from "react";
import { verifyTokenRequest } from "../../api/UserApi";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import FormikTextField from "../../components/FormikTextField";
import { Formik, Form } from "formik";
import { resetPass } from "../../api/UserApi";
import PassValidationSchema from "../../validation/PasswordValidation";

const ResetPassPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [valid, setIsValid] = useState(false);
    const { userId, token } = useParams();

    useEffect(() => {
        const verifyResetToken = async () => {
            const verificationResponse = await verifyTokenRequest(userId, token, "resetPass");
            if (verificationResponse.success) setIsValid(true);
            else setIsValid(false);
            setLoading(false);
        }
        verifyResetToken();
    }, []);

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className="resetPassPage page container">
            {valid ?
                <ResetPassForm />
                :
                <h1>Invalid link</h1>
            }
        </div>
    )
}

const ResetPassForm = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const initialValues = {
        newPassword: "",
        confirmPassword: ""
    }

    const submitHandler = async (data) => {
        const response = await resetPass(data);
        if (response.success) navigate("/");
        if (response.error) alert(response.error);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={PassValidationSchema}
            onSubmit={async (userData, { setSubmitting }) => {
                userData.userId = userId;
                await submitHandler(userData);
                setSubmitting(false);//Enable submit button
            }}
        >
            {({ isSubmitting }) => (
                <Form className="resetPassform">
                    <FormikTextField
                        type="password"
                        name="newPassword"
                        label="newPassword"
                    />
                    <FormikTextField
                        type="password"
                        name="confirmPassword"
                        label="confirmPassword"
                    />
                    <button
                        className="btn-primary"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        Reset password
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default ResetPassPage;