import { ICreateCarDTO } from '@modules/cars/DTOs/ICreateCarDTO';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let sampleCar1: ICreateCarDTO;
let sampleCar2: ICreateCarDTO;
let carsRepository: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
    beforeAll(() => {
        sampleCar1 = {
            name: 'HB-20',
            description: 'Stylish car',
            daily_rate: 100,
            license_plate: 'NPM-1059',
            fine_amount: 50,
            brand: 'Hyundai',
            category_id: '471a440e-3a3c-4342-832f-4e74e475e9e3',
        };
        sampleCar2 = {
            name: 'Creta',
            description: 'Big car',
            daily_rate: 120,
            license_plate: 'NPX-2085',
            fine_amount: 60,
            brand: 'Hyundai',
            category_id: '9e1eca6a-b7ca-465c-ab3b-349cee1ba96e',
        };
    });

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    });

    it('Should be able to list all available cars', async () => {
        const car1 = await carsRepository.create(sampleCar1);
        const car2 = await carsRepository.create(sampleCar2);

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car1, car2]);
    });

    it('Should be able to list all available cars by name', async () => {
        await carsRepository.create(sampleCar1);
        const car2 = await carsRepository.create(sampleCar2);

        const cars = await listCarsUseCase.execute({
            name: 'Creta',
        });

        expect(cars).toEqual([car2]);
    });
});
