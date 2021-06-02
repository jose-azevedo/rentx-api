import { ICreateRentalDTO } from '../DTOs/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
    create({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental>;
    findOngoingRentalByCar(car_id: string): Promise<Rental>;
    findOngoingRentalByUser(user_id: string): Promise<Rental>;
    rent({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<void>;
}

export { IRentalsRepository };
