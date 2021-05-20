import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../DTOs/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create(data: ICreateUserDTO): Promise<void> {
        const { name, email, password, driver_license } = data;

        const user = this.repository.create({
            name,
            email,
            password,
            driver_license,
        });

        await this.repository.save(user);
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        return user;
    }
}

export { UsersRepository };
