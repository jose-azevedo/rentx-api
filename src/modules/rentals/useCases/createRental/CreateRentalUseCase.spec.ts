import dayjs from 'dayjs';

import { ICreateRentalDTO } from '@modules/rentals/DTOs/ICreateRentalDTO';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/Dayjs';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepository: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

let sampleRental_Car1_User1: ICreateRentalDTO;
let sampleRental_Car2_User1: ICreateRentalDTO;
let sampleRental_Car1_User2: ICreateRentalDTO;
let sampleRentalLessThan24h: ICreateRentalDTO;

describe('Create Rental', () => {
    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dayjsDateProvider
        );
    });

    beforeAll(() => {
        const dayAdd24Hours = dayjs().add(1, 'day').toDate();
        sampleRental_Car1_User1 = {
            car_id: '12345',
            user_id: '54321',
            expected_return_date: dayAdd24Hours,
        };
        sampleRental_Car2_User1 = {
            car_id: '23456',
            user_id: '54321',
            expected_return_date: dayAdd24Hours,
        };
        sampleRental_Car1_User2 = {
            car_id: '12345',
            user_id: '65432',
            expected_return_date: dayAdd24Hours,
        };
        sampleRentalLessThan24h = {
            car_id: '12345',
            user_id: '54321',
            expected_return_date: dayjs().toDate(),
        };
    });

    it('Should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute(
            sampleRental_Car1_User1
        );

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('Should not be able to create a new rental if user already has an ongoing one', () => {
        expect(async () => {
            await createRentalUseCase.execute(sampleRental_Car1_User1);
            await createRentalUseCase.execute(sampleRental_Car2_User1);
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create a new rental if car has already been rented', () => {
        expect(async () => {
            await createRentalUseCase.execute(sampleRental_Car1_User1);
            await createRentalUseCase.execute(sampleRental_Car1_User2);
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create a new rental if rental duration is less than 24 hours', () => {
        expect(async () => {
            await createRentalUseCase.execute(sampleRentalLessThan24h);
        }).rejects.toBeInstanceOf(AppError);
    });
});
