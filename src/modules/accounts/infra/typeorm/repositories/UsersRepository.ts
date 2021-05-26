import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../../DTOs/ICreateUserDTO';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create(data: ICreateUserDTO): Promise<void> {
        const { id, name, email, password, driver_license, avatar } = data;

        const user = this.repository.create({
            id,
            name,
            email,
            password,
            avatar,
            driver_license,
        });

        await this.repository.save(user);
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ id });

        return user;
    }
}

export { UsersRepository };
