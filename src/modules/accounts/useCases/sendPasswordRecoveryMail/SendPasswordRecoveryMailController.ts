import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendPasswordRecoveryMailUseCase } from './SendPasswordRecoveryMailUseCase';

class SendPasswordRecoveryMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendPasswordRecoveryMailUseCase = container.resolve(
            SendPasswordRecoveryMailUseCase
        );

        await sendPasswordRecoveryMailUseCase.execute(email);

        return response.send();
    }
}

export { SendPasswordRecoveryMailController };
