import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowUserProfileUseCase } from './showUserProfileUseCase';

class ShowUserProfileController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const showUserProfileUseCase = container.resolve(
            ShowUserProfileUseCase
        );

        const user = await showUserProfileUseCase.execute(id);

        return response.json(user);
    }
}

export { ShowUserProfileController };
