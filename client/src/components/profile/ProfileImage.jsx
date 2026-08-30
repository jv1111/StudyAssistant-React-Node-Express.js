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
        setImgSrc(`${import.meta.env.VITE_API_API_URL}${response.url}`);
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
        className="hover:cursor-pointer group relative h-24 w-24 overflow-hidden rounded-full border-2 border-primary/30 bg-background-secondary shadow-md transition-all duration-300 hover:border-primary hover:shadow-(--shadow-button)"
      >
        <img
          src={imgSrc || emptyProfile}
          alt="Profile Avatar"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/60 text-xs font-semibold text-white opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
          Upload
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
