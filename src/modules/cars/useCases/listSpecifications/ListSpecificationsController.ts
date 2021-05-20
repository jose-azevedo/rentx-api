import { Request, Response } from 'express';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
    constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}

    handle(request: Request, response: Response): Response {
        const allSpecifications = this.listSpecificationsUseCase.execute();
        return response.json({ allSpecifications });
    }
}

export { ListSpecificationsController };
