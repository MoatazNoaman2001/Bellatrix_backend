import multer from "multer";

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'File upload error', error: err.message });
    }

    res.status(500).json({
        message: 'Something went wrong',
        error: err.message
    });
};