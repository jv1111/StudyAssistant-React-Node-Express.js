import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ProfileImage, ChangePassForm, EmailForm } from "../../components";

const ProfilePage = () => {

    const user = useSelector(state => state.auth.user);
    return (
        <div className="profilePage container">
            <div className="top">
                <div className="profile">
                    <ProfileImage />
                    <label className="bold">{user.username}</label>
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