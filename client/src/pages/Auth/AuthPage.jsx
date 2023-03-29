import React, { useState } from "react";
import { LoginForm, SignUpForm, Popup } from "../../components";

const AuthPage = () => {

    const [signUptrigger, setSignUpTrigger] = useState(false);

    return (
        <div className="page authPage container pt-5">
            <div className="titleDiv">
                <h1 className="title">Rev-bot</h1>
                <div className="line"></div>
                <div className="descriptionDiv">
                    <p>An automatic quiz maker app automatically converts user-inputted questions and answers into multiple-choice quizzes and can grade them automatically. It is a time-saving tool for educators, trainers, and anyone who needs to create quizzes quickly and efficiently.</p>
                </div>
            </div>
            <div className="loginDiv">
                <div className="lightBox loginForm">
                    <div className="lightBoxPanel">
                        <LoginForm setSignUpTrigger={setSignUpTrigger} />
                    </div>
                </div>
            </div>
            <Popup trigger={signUptrigger} setTrigger={setSignUpTrigger}>
                <div className="lightBox signUpForm">
                    <div className="lightBoxPanel">
                        <SignUpForm />
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default AuthPage;