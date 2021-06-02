import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute({
        car_id,
        user_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const carUnavailable =
            await this.rentalsRepository.findOngoingRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError('Car currently rented!');
        }

        const userUnavailable =
            await this.rentalsRepository.findOngoingRentalByUser(user_id);

        if (userUnavailable) {
            throw new AppError('User can only rent one car at a time!');
        }

        const duration = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        );

        const minimumRentalDuration = 24;

        if (duration < minimumRentalDuration) {
            throw new AppError(
                'Rental duration needs to be longer than 24 hours!'
            );
        }

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
