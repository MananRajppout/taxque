// Cloudinary Image Upload Utility for Next.js
// This utility handles image uploads to Cloudinary cloud storage

export const uploadImage = async (file: File): Promise<string | null> => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    console.error('Invalid file type. Please upload an image file.');
    return null;
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    console.error('File size too large. Please upload an image smaller than 10MB.');
    return null;
  }

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

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate response
    if (!data.secure_url) {
      throw new Error('No secure URL returned from Cloudinary');
    }

    return data.secure_url; // Cloudinary returns the uploaded image URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

// Alternative upload method with progress tracking
export const uploadImageWithProgress = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string | null> => {
  return new Promise((resolve) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "TaxQue");

    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url);
        } catch (error) {
          console.error('Error parsing response:', error);
          resolve(null);
        }
      } else {
        console.error('Upload failed with status:', xhr.status);
        resolve(null);
      }
    });

    xhr.addEventListener('error', () => {
      console.error('Upload failed');
      resolve(null);
    });

    xhr.open('POST', 'https://api.cloudinary.com/v1_1/drdxdfvpp/image/upload');
    xhr.send(formData);
  });
};

// Utility function to validate image file
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: 'Invalid file type. Please upload an image file.' };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size too large. Please upload an image smaller than 10MB.' };
  }

  // Check file extension
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  
  if (!allowedExtensions.includes(fileExtension)) {
    return { isValid: false, error: 'Unsupported file format. Please use JPG, PNG, GIF, WebP, or SVG.' };
  }

  return { isValid: true };
};

// Utility function to compress image before upload
export const compressImage = (file: File, maxWidth: number = 1920, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        file.type,
        quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
};
