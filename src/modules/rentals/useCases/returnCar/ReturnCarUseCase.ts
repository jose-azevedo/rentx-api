import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/Dayjs';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
    rental_id: string;
}

@injectable()
class ReturnCarUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,

        @inject('CarsRepository')
        private carsRepository: ICarsRepository,

        @inject('DayjsDateProvider')
        private dayjsDateProvider: DayjsDateProvider
    ) {}

    async execute({ user_id, rental_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(rental_id);

        if (!rental) {
            throw new AppError('Rental does not exist!');
        }

        const dateNow = this.dayjsDateProvider.dateNow();

        let daily = this.dayjsDateProvider.compareInDays(
            rental.start_date,
            dateNow
        );

        const minimum_daily = 1;
        if (daily <= 1) {
            daily = minimum_daily;
        }

        const delay = this.dayjsDateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );

        const car = await this.carsRepository.findById(rental.car_id);

        let fine = 0;
        if (delay > 0) {
            fine = delay * car.fine_amount;
        }

        const total_due = daily * car.daily_rate + fine;

        rental.total = total_due;
        rental.end_date = dateNow;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailability(rental.car_id, true);

        return rental;
    }
}

export { ReturnCarUseCase };
