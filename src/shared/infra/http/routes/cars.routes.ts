import { Router } from 'express';

import { AddCarSpecificationController } from '@modules/cars/useCases/addCarSpecification/AddCarSpecificationController';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const addCarSpecificationController = new AddCarSpecificationController();

carsRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
    '/:id/specifications',
    ensureAuthenticated,
    ensureAdmin,
    addCarSpecificationController.handle
);

export { carsRoutes };
