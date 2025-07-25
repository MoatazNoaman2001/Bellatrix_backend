import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // You can customize the subdirectory based on file type
    let subfolder = 'media';
    if (file.mimetype.startsWith('image/')) {
      subfolder = 'images';
    } else if (file.mimetype.startsWith('video/')) {
      subfolder = 'videos';
    }
    
    const dir = path.join(uploadsDir, subfolder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm|mkv/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Error: Only images (jpeg, jpg, png, gif) and videos (mp4, mov, avi, webm, mkv) are allowed!'));
};

// Multer instance
export const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 100 * 1024 * 1024 // 100MB (adjust as needed)
  },
  fileFilter: fileFilter
});

// Specific upload handlers
export const uploadMedia = upload.single('media'); // For single file uploads
export const uploadMultipleMedia = upload.array('media', 5); // For multiple files (max 5)

// Helper function to get file URL
export const getFileUrl = (req, filename) => {
  if (!filename) return null;
  const subfolder = filename.includes('images/') ? 'images' : 
                   filename.includes('videos/') ? 'videos' : 'media';
  return `${req.protocol}://${req.get('host')}/uploads/${subfolder}/${filename}`;
};