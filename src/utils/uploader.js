import __dirname from './index.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = 'others';

    // Detectamos el destino por la ruta
    if (req.url.includes('/pets')) {
      folder = 'pets';
    } else if (req.url.includes('/documents')) {
      folder = 'documents';
    }

    const dirPath = path.join(__dirname, `../public/img/${folder}`);

    // Aseguramos que la carpeta exista
    fs.mkdirSync(dirPath, { recursive: true });

    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploader = multer({ storage });

export default uploader;