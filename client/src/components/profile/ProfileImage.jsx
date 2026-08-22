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
    <div className="shrink-0">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        title="Change profile picture"
        className="group relative h-24 w-24 overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-(--shadow-glass)"
      >
        <img
          src={imgSrc || emptyProfile}
          alt="Profile"
          className="h-full w-full object-cover"
        />

        <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
          Change
        </span>
      </button>

      <input
        ref={fileInputRef}
        id="imageInput"
        type="file"
        accept="image/*"
        name="image"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfileImage;
