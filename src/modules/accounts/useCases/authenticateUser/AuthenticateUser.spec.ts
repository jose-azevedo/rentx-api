import { ICreateUserDTO } from '@modules/accounts/DTOs/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/Dayjs';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepository = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepository,
            dateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it('Should be able to authenticate user', async () => {
        const user: ICreateUserDTO = {
            name: 'José',
            email: 'jose@email.com',
            password: '1234',
            driver_license: '000111333',
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    it('Should not be able to authenticate nonexistent user', async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: 'nonexistent@email.com',
                password: '1234',
            })
        ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });

    it('Should not be able to authenticate user with incorrect password', async () => {
        const user: ICreateUserDTO = {
            name: 'José',
            email: 'jose@email.com',
            password: '1234',
            driver_license: '000111333',
        };

        await createUserUseCase.execute(user);

        expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: '4321',
            })
        ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });
});
