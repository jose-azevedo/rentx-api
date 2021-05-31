import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddCarSpecificationUseCase } from './AddCarSpecification';

class AddCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { specifications_id } = request.body;

        const addCarSpecificationUseCase = container.resolve(
            AddCarSpecificationUseCase
        );

        const car = await addCarSpecificationUseCase.execute({
            car_id: id,
            specifications_id,
        });

        return response.json(car);
    }
}

export { AddCarSpecificationController };
