import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/DTOs/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute(data: ICreateUserDTO): Promise<void> {
        const { name, email, password, driver_license } = data;

        const passwordHash = await hash(password, 8);

        const userAlreadyExists = await this.usersRepository.findUserByEmail(
            email
        );

        if (userAlreadyExists) {
            throw new AppError('User already exists!');
        }

        this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
