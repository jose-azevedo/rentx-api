import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/DTOs/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({
        id,
        car_id,
        user_id,
        expected_return_date,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            id,
            car_id,
            user_id,
            expected_return_date,
            end_date,
            total,
        });

        await this.repository.save(rental);

        return rental;
    }

    async findOngoingRentalByCar(car_id: string): Promise<Rental> {
        const ongoingRental = await this.repository.findOne({
            where: { car_id, end_date: null },
        });

        return ongoingRental;
    }

    async findOngoingRentalByUser(user_id: string): Promise<Rental> {
        const ongoingRental = await this.repository.findOne({
            where: { user_id, end_date: null },
        });

        return ongoingRental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id);
        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ['car'],
        });

        return rentals;
    }
}

export { RentalsRepository };
