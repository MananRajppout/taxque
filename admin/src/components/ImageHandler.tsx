'use client';

import React from "react";
import Image from 'next/image';


const Images = {
  AddIcon: "/assets/Images/ImageUpload.png",
  crossIcon: "/assets/Images/crossIcon.svg",
};

export interface SingleImageUploadProps {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  previewURL: string | null;
  setPreviewURL: React.Dispatch<React.SetStateAction<string | null>>;
  imgAltText: string;
  setImgAltText: React.Dispatch<React.SetStateAction<string>>;
  DBImg?: string;
  id: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  setImage,
  previewURL,
  setPreviewURL,
  setImgAltText,
  DBImg,
  id,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImage(file);
      setPreviewURL(fileURL);
    }
  };

  const handleDelete = () => {
    setImage(null);
    setPreviewURL(null);
    setImgAltText("");
  };

  return (
    <div className="w-full h-full flex flex-row flex-wrap relative cursor-pointer">
      <label
        htmlFor={id}
        style={{ pointerEvents: previewURL ? "none" : "auto" }}
        className="cursor-pointer"
      >
        <Image 
          src={Images.AddIcon} 
          alt="Upload" 
          className="absolute -top-8 right-0 w-6 h-6 sm:w-6 sm:h-6" 
          width={24}
          height={24}
        />
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {previewURL || DBImg ? (
        <div className="w-full h-full flex">
          <div className="relative w-full h-full rounded-lg shadow-md">
            <Image 
              src={previewURL || DBImg || ''} 
              alt="thumbnail" 
              className="w-full h-full object-cover rounded-lg"
              width={200}
              height={200}
            />
            {previewURL && (
              <Image
                className="absolute -top-8 right-10 w-5 h-5 cursor-pointer transition-transform duration-200 hover:scale-110"
                onClick={handleDelete}
                src={Images.crossIcon}
                alt="Delete"
                width={20}
                height={20}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SingleImageUpload;
