import { useEffect, useRef, useState } from "react";

import { changeProfileAPI, getProfileImageAPI } from "../../api/user.api";
import emptyProfile from "../../assets/img/profile.png";

const ProfileImage = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const getImage = async () => {
      const response = await getProfileImageAPI();

      if (response.url) {
        setImgSrc(response.url);
      }
    };

    getImage();
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      setImgSrc(loadEvent.target.result);
    };

    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    await changeProfileAPI(formData);
  };

  return (
    <div className="profile-image">
      <button
        type="button"
        className="profile-image-button"
        onClick={() => fileInputRef.current?.click()}
        title="Change profile picture"
      >
        <img src={imgSrc || emptyProfile} alt="Profile" />

        <span className="profile-image-overlay">Change</span>
      </button>

      <input
        ref={fileInputRef}
        id="imageInput"
        type="file"
        accept="image/*"
        name="image"
        className="visually-hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfileImage;
