import { ICreateCarDTO } from '@modules/cars/DTOs/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
    private cars: Car[] = [];

    async create({
        name,
        category_id,
        brand,
        fine_amount,
        license_plate,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            category_id,
            brand,
            fine_amount,
            license_plate,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(
            (car) => car.license_plate === license_plate
        );

        return car;
    }
}

export { CarsRepositoryInMemory };
