import { ICreateCarDTO } from '../DTOs/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findById(id: string): Promise<Car>;
    listAvailableCars(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]>;
    updateAvailability(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
