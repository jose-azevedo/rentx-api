import { ICreateRentalDTO } from '../DTOs/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
    create({
        id,
        car_id,
        user_id,
        expected_return_date,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental>;
    findOngoingRentalByCar(car_id: string): Promise<Rental>;
    findOngoingRentalByUser(user_id: string): Promise<Rental>;
    findById(id: string): Promise<Rental>;
    findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
