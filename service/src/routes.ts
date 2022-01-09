import { Router } from "express";

import { ServiceItems } from "./services/ServiceItems";
import { ServicePoints } from "./services/ServicePoints";

const getItems = new ServiceItems();
const servicePoints = new ServicePoints();

const router = Router();

router.get('/items', getItems.index);

router.post('/points', servicePoints.createPoint);
router.get('/points/:id', servicePoints.show);

export { router }
