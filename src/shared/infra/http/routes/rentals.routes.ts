import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { ReturnCarController } from '@modules/rentals/useCases/returnCar/ReturnCarController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnCarController = new ReturnCarController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post(
    '/return/:id',
    ensureAuthenticated,
    returnCarController.handle
);

rentalsRoutes.get(
    '/user',
    ensureAuthenticated,
    listRentalsByUserController.handle
);

export { rentalsRoutes };
