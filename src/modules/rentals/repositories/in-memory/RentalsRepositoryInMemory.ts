import { ICreateRentalDTO } from '@modules/rentals/DTOs/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
    private rentals: Rental[] = [];

    async create({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date(),
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

    async rent({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export { RentalsRepositoryInMemory };
