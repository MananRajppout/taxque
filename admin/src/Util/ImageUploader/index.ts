// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "drdxdfvpp",
//   api_key: "546299233659582",
//   api_secret: "Wde3XQNav1oi0Dhm3j3Vlq2PHuI",
// });

// export const uploadImage = async (filePath: string) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: "images" as any,
//     });
//     return result.secure_url;
//   } catch (error) {
//     console.error("Cloudinary Upload Error:", error);
//     throw error;
//   }
// };

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "TaxQue"); // Replace with your Cloudinary preset

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/drdxdfvpp/image/upload`, // Replace with your Cloudinary Cloud Name
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();
    return data.secure_url; // Cloudinary returns the uploaded image URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};
