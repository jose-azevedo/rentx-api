import { Router } from 'express';

import { SendPasswordRecoveryMailController } from '@modules/accounts/useCases/sendPasswordRecoveryMail/SendPasswordRecoveryMailController';

const passwordRoutes = Router();

const sendPasswordRecoveryMailController =
    new SendPasswordRecoveryMailController();

passwordRoutes.post('/recovery', sendPasswordRecoveryMailController.handle);

export { passwordRoutes };
