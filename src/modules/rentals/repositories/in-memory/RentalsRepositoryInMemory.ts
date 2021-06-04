import { ICreateRentalDTO } from '@modules/rentals/DTOs/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
    private rentals: Rental[] = [];

    async create({
        id,
        car_id,
        user_id,
        expected_return_date,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            id,
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date(),
            end_date,
            total,
        });

        this.rentals.push(rental);

        return rental;
    }

    async findOngoingRentalByCar(car_id: string): Promise<Rental> {
        const rental = this.rentals.find(
            (rental) =>
                rental.car_id === car_id && rental.end_date === undefined
        );
        return rental;
    }

    async findOngoingRentalByUser(user_id: string): Promise<Rental> {
        const rental = this.rentals.find(
            (rental) =>
                rental.user_id === user_id && rental.end_date === undefined
        );
        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = this.rentals.find((rental) => rental.id === id);
        return rental;
    }
}

export { RentalsRepositoryInMemory };
