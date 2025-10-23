# Utilities

This folder contains utility functions and helpers for the Next.js application.

## ImageUploader

The ImageUploader utility provides functions for uploading images to Cloudinary cloud storage.

### Functions

#### `uploadImage(file: File): Promise<string | null>`
Uploads an image file to Cloudinary and returns the secure URL.

**Parameters:**
- `file`: The image file to upload

**Returns:**
- `Promise<string | null>`: The secure URL of the uploaded image, or null if upload fails

**Features:**
- File type validation (images only)
- File size validation (max 10MB)
- Error handling with detailed logging

#### `uploadImageWithProgress(file: File, onProgress?: (progress: number) => void): Promise<string | null>`
Uploads an image file with progress tracking.

**Parameters:**
- `file`: The image file to upload
- `onProgress`: Optional callback function to track upload progress (0-100)

**Returns:**
- `Promise<string | null>`: The secure URL of the uploaded image, or null if upload fails

#### `validateImageFile(file: File): { isValid: boolean; error?: string }`
Validates an image file before upload.

**Parameters:**
- `file`: The file to validate

**Returns:**
- `{ isValid: boolean; error?: string }`: Validation result with optional error message

**Validation checks:**
- File type (must be image)
- File size (max 10MB)
- File extension (JPG, PNG, GIF, WebP, SVG)

#### `compressImage(file: File, maxWidth?: number, quality?: number): Promise<File>`
Compresses an image file to reduce size before upload.

**Parameters:**
- `file`: The image file to compress
- `maxWidth`: Maximum width in pixels (default: 1920)
- `quality`: Compression quality 0-1 (default: 0.8)

**Returns:**
- `Promise<File>`: The compressed image file

### Usage Examples

```typescript
import { uploadImage, validateImageFile, compressImage } from '@/util/ImageUploader';

// Basic upload
const handleImageUpload = async (file: File) => {
  const imageUrl = await uploadImage(file);
  if (imageUrl) {
    console.log('Image uploaded:', imageUrl);
  }
};

// Upload with validation and compression
const handleOptimizedUpload = async (file: File) => {
  // Validate file
  const validation = validateImageFile(file);
  if (!validation.isValid) {
    console.error(validation.error);
    return;
  }

  // Compress image
  const compressedFile = await compressImage(file, 1920, 0.8);
  
  // Upload compressed image
  const imageUrl = await uploadImage(compressedFile);
  if (imageUrl) {
    console.log('Compressed image uploaded:', imageUrl);
  }
};

// Upload with progress tracking
const handleUploadWithProgress = async (file: File) => {
  const imageUrl = await uploadImageWithProgress(file, (progress) => {
    console.log(`Upload progress: ${progress}%`);
  });
  
  if (imageUrl) {
    console.log('Image uploaded:', imageUrl);
  }
};
```

### Configuration

The ImageUploader uses Cloudinary for image storage. To configure:

1. Update the Cloud Name in the upload URL:
   ```typescript
   `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`
   ```

2. Update the upload preset:
   ```typescript
   formData.append("upload_preset", "YOUR_PRESET_NAME");
   ```

### Error Handling

All functions include comprehensive error handling:
- Network errors
- File validation errors
- Cloudinary API errors
- Response parsing errors

Errors are logged to the console and functions return null or appropriate error objects.
