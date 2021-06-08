import { ICreateUserTokenDTO } from '../DTOs/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

interface IUsersTokensRepository {
    create({
        user_id,
        expiration_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserToken>;
}

export { IUsersTokensRepository };
