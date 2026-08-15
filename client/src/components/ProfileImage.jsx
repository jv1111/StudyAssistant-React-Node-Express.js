import React, { useEffect, useState } from "react";
import { changeProfileAPI, getProfileImageAPI } from "../api/user.api";
import empty_profile from "../assets/img/profile.png";

const ProfileImage = () => {
  const [imgSrc, setImgSrc] = useState();

  useEffect(() => {
    const getImage = async () => {
      const response = await getProfileImageAPI();
      setImgSrc(response.url);
    };
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
  };

  const upload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    changeProfileAPI(formData);
  };

  return (
    <div className="profileImage">
      <label className="imageInput" htmlFor="imageInput">
        <div className="imgFrame">
          <img src={imgSrc ? imgSrc : empty_profile} alt="Profile" />
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
  );
};

export default ProfileImage;
