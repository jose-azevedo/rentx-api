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

    async listAvailableCars(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder('car')
            .where('available = :available', { available: true });
        if (name) {
            carsQuery.andWhere('name = :name', { name });
        }
        if (brand) {
            carsQuery.andWhere('brand = :brand', { brand });
        }
        if (category_id) {
            carsQuery.andWhere('category_id = :category_id', { category_id });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }
}

export { CarsRepository };
