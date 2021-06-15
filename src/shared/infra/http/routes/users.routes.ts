import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ShowUserProfileController } from '@modules/accounts/useCases/showProfile/showUserProfileController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const showUserProfileController = new ShowUserProfileController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.get(
    '/profile',
    ensureAuthenticated,
    showUserProfileController.handle
);

usersRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    uploadAvatar.single('avatar'),
    updateUserAvatarController.handle
);

export { usersRoutes };
