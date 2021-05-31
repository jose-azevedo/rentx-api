import { ICreateCarDTO } from '@modules/cars/DTOs/ICreateCarDTO';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { ICreateSpecificationDTO } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

import { AddCarSpecificationUseCase } from './AddCarSpecification';

let addCarSpecificationUseCase: AddCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;
let sampleCar: ICreateCarDTO;
let sampleSpecification: ICreateSpecificationDTO;

describe('Add Car Specification', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        specificationsRepository = new SpecificationsRepositoryInMemory();

        addCarSpecificationUseCase = new AddCarSpecificationUseCase(
            carsRepository,
            specificationsRepository
        );
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

        sampleSpecification = {
            name: 'Automatic windows',
            description:
                'All windows roll up or down with the click of a button',
        };
    });

    it('Should be able to add a new specification to an existing car', async () => {
        const car = await carsRepository.create(sampleCar);
        const specification = await specificationsRepository.create(
            sampleSpecification
        );

        const carSpecifications = await addCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [specification.id],
        });

        expect(carSpecifications).toHaveProperty('specifications');
        expect(carSpecifications.specifications.length).toBe(1);
    });

    it('Should not be able to add a new specification to a nonexisting car', () => {
        expect(async () => {
            const car_id = '1234';
            const specifications_id = ['12345'];

            await addCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
