import { Router } from 'express';

import { ResetPasswordController } from '@modules/accounts/useCases/resetPassword/ResetPasswordController';
import { SendPasswordRecoveryMailController } from '@modules/accounts/useCases/sendPasswordRecoveryMail/SendPasswordRecoveryMailController';

const passwordRoutes = Router();

const sendPasswordRecoveryMailController =
    new SendPasswordRecoveryMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/recovery', sendPasswordRecoveryMailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
