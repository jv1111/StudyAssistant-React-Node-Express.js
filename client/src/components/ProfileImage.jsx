import React, { useEffect, useState } from "react";
import { changeProfile, fetchProfileImgAPI } from "../api/UserApi";
import empty_profile from "../assets/img/profile.png";

const ProfileImage = () => {
    const [imgSrc, setImgSrc] = useState();

    useEffect(() => {
        const getImage = async () => {
            const response = await fetchProfileImgAPI();
            setImgSrc(response.url);
        }
        getImage();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImgSrc(e.target.result);
        };
        reader.readAsDataURL(file);
        upload(file);
    }

    const upload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        changeProfile(formData);
    }

    return (
        <div className="profileImage">
            <label className="imageInput" htmlFor="imageInput">
                <div className="imgFrame">
                    <img
                        src={imgSrc ? imgSrc : empty_profile}
                        alt="profile picture"
                    />
                </div>

            </label>
            <input
                id="imageInput"
                type="file"
                accept="image/*"
                name="image"
                style={{ display: "none" }}
                onChange={handleImageChange}
            />
        </div>
    )
}

export default ProfileImage;