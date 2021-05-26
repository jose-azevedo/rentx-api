import { ICreateUserDTO } from '@modules/accounts/DTOs/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
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
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'nonexistent@email.com',
                password: '1234',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to authenticate user with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: 'José',
                email: 'jose@email.com',
                password: '1234',
                driver_license: '000111333',
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: '4321',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
