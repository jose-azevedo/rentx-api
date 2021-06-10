import { ICreateUserTokenDTO } from '@modules/accounts/DTOs/ICreateUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    private usersTokens: UserToken[] = [];

    async create({
        user_id,
        expiration_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            user_id,
            refresh_token,
            expiration_date,
        });

        this.usersTokens.push(userToken);
        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const userToken = this.usersTokens.find(
            (token) =>
                token.refresh_token === refresh_token &&
                token.user_id === user_id
        );

        return userToken;
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = this.usersTokens.find(
            (token) => token.refresh_token === refresh_token
        );

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const tokenIndex = this.usersTokens.findIndex(
            (token) => token.id === id
        );

        this.usersTokens.splice(tokenIndex, 1);
    }
}

export { UsersTokensRepositoryInMemory };
