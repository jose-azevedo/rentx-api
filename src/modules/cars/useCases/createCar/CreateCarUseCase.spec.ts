import { ICreateCarDTO } from '@modules/cars/DTOs/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let sampleCar: ICreateCarDTO;

describe('Create Car', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    beforeAll(() => {
        sampleCar = {
            name: 'HB-20',
            description: 'Stylish car',
            daily_rate: 100,
            license_plate: 'NPM-1059',
            fine_amount: 50,
            brand: 'Hyundai',
            category_id: 'Hatch',
        };
    });

    it('Should be able to create new car', async () => {
        const car = await createCarUseCase.execute(sampleCar);
        expect(car).toHaveProperty('id');
    });

    it('Should not be able to create a car with an existing license plate', () => {
        expect(async () => {
            await createCarUseCase.execute(sampleCar);

            await createCarUseCase.execute(sampleCar);
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to create a car with "available" as true by default', async () => {
        const car = await createCarUseCase.execute(sampleCar);
        console.log(car);
        expect(car.available).toBe(true);
    });
});
