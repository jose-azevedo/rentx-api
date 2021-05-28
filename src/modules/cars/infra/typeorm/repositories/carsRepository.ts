import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/DTOs/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }
    async create(carDTO: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create(carDTO);

        await this.repository.save(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });

        return car;
    }
}

export { CarsRepository };
