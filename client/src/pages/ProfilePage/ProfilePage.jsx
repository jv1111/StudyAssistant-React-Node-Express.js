import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ProfileImage, ChangePassForm, EmailForm } from "../../components";
import "../../styles/profilePage.css";

const ProfilePage = () => {

    const user = useSelector(state => state.auth.user);
    return (
        <div className="profilePage container">
            <div className="top">
                <div className="profile text-center">
                    <ProfileImage />
                    <label className="fw-bold">Username</label>
                </div>
                <div className="line"></div>
            </div>
            <div className="bottom">
                <ChangePassForm />
                <EmailForm email={user.email} />
            </div>
        </div>
    );
}

export default ProfilePage;