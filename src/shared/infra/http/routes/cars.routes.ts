import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { AddCarSpecificationController } from '@modules/cars/useCases/addCarSpecification/AddCarSpecificationController';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const addCarSpecificationController = new AddCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

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

carsRoutes.post(
    '/:id/images',
    ensureAuthenticated,
    ensureAdmin,
    upload.array('images'),
    uploadCarImagesController.handle
);

export { carsRoutes };
