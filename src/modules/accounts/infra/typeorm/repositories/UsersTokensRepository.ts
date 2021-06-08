import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/DTOs/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { UserToken } from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }

    async create({
        user_id,
        expiration_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const user_token = this.repository.create({
            user_id,
            expiration_date,
            refresh_token,
        });

        await this.repository.save(user_token);

        return user_token;
    }
}

export { UsersTokensRepository };
