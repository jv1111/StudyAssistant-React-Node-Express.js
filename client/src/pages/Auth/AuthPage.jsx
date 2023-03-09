import React, { useState } from "react";
import { LoginForm, SignUpForm, Popup } from "../../components";

const AuthPage = () => {

    const [signUptrigger, setSignUpTrigger] = useState(false);

    return (
        <div className="page">
            <LoginForm setSignUpTrigger={setSignUpTrigger} />
            <Popup trigger={signUptrigger} setTrigger={setSignUpTrigger}>
                <SignUpForm />
            </Popup>
        </div>
    );
}

export default AuthPage;