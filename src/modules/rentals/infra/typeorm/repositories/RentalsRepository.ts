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
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        await this.repository.save(rental);

        return rental;
    }

    async findOngoingRentalByCar(car_id: string): Promise<Rental> {
        const ongoingRental = await this.repository
            .createQueryBuilder('rental')
            .where('car_id = :car_id', { car_id })
            .andWhere('end_date = :end_date', { end_date: null })
            .getOne();

        return ongoingRental;
    }

    async findOngoingRentalByUser(user_id: string): Promise<Rental> {
        const ongoingRental = await this.repository
            .createQueryBuilder('rental')
            .where('user_id = :user_id', { user_id })
            .andWhere('end_date = :end_date', { end_date: null })
            .getOne();

        return ongoingRental;
    }

    async rent({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export { RentalsRepository };
