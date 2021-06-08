import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/Dayjs';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepository: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let carsRepository: CarsRepositoryInMemory;

const dayAdd24Hours = dayjs().add(2, 'day').toDate();

describe('Create Rental', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        rentalsRepository = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dayjsDateProvider,
            carsRepository
        );
    });

    it('Should be able to create a new rental', async () => {
        const car = await carsRepository.create({
            name: 'HB-20',
            description: 'Cool car',
            brand: 'Hyundai',
            category_id: '471a440e-3a3c-4342-832f-4e74e475e9e3',
            daily_rate: 90,
            fine_amount: 30,
            license_plate: 'NPM-1028',
        });

        const rental = await createRentalUseCase.execute({
            user_id: '1234',
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('Should not be able to create a new rental if user already has an ongoing one', async () => {
        await rentalsRepository.create({
            car_id: '12345',
            user_id: '54321',
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                car_id: '98765',
                user_id: '54321',
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(
            new AppError('User can only rent one car at a time!')
        );
    });

    it('Should not be able to create a new rental if car has already been rented', async () => {
        await rentalsRepository.create({
            car_id: '12345',
            user_id: '54321',
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                car_id: '12345',
                user_id: '98765',
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError('Car currently rented!'));
    });

    it('Should not be able to create a new rental if rental duration is less than 24 hours', async () => {
        await expect(
            createRentalUseCase.execute({
                car_id: '12345',
                user_id: '54321',
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(
            new AppError('Rental duration needs to be longer than 24 hours!')
        );
    });
});
