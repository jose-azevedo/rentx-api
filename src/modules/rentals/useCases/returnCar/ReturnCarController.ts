import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ReturnCarUseCase } from './ReturnCarUseCase';

class ReturnCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id: rental_id } = request.params;

        const returnCarUseCase = container.resolve(ReturnCarUseCase);

        const rental = await returnCarUseCase.execute({
            rental_id: rental_id as string,
            user_id,
        });

        return response.status(200).json(rental);
    }
}

export { ReturnCarController };
