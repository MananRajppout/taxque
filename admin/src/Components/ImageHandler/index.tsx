import React from "react";
import "./style.css";

import AddIcon from "../../assets/Images/ImageUpload.png";
import crossIcon from "../../assets/Images/crossIcon.svg";

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
  // image,
  setImage,
  previewURL,
  setPreviewURL,
  // imgAltText,
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

  // const handleAltTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setImgAltText(e.target.value);
  // };

  return (
    <div className="upload-container">
      <label
        htmlFor={id}
        style={{ pointerEvents: previewURL ? "none" : "auto" }}
      >
        <img src={AddIcon} alt="Upload" className="CEImgUploadIcon" />
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {previewURL || DBImg ? (
        <div className="preview-container">
          <div className="preview-item">
            <img src={previewURL || DBImg} alt="thumbnail" />
            {previewURL && (
              <img
                className="delete-btn"
                onClick={handleDelete}
                src={crossIcon}
                alt="Delete"
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SingleImageUpload;
