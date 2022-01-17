import { Router } from "express";

import { ServiceItems } from "./services/ServiceItems";
import { ServicePoints } from "./services/ServicePoints";

import multer from 'multer';
import multerConfig from './config/multer';

const getItems = new ServiceItems();
const servicePoints = new ServicePoints();

const upload = multer(multerConfig);
const router = Router();

router.get('/items', getItems.index);

router.post('/points', upload.single('image'), servicePoints.createPoint);
router.get('/points/:id', servicePoints.show);
router.get('/points', servicePoints.indexPoints);

export { router }
