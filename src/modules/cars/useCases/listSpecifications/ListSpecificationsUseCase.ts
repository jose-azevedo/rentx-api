import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

class ListSpecificationsUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) {}

    execute(): Specification[] {
        const allSpecifications = this.specificationsRepository.list();
        return allSpecifications;
    }
}

export { ListSpecificationsUseCase };
