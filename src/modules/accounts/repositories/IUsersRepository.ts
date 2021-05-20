import { ICreateUserDTO } from '../DTOs/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findUserByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { IUsersRepository };
