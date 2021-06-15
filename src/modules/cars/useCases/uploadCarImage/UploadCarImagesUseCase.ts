import { inject, injectable } from 'tsyringe';

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject('CarImagesRepository')
        private carImagesRepository: ICarImagesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}

    async execute(car_id: string, images_name: string[]): Promise<void> {
        images_name.map(async (image) => {
            await this.carImagesRepository.create(car_id, image);
            await this.storageProvider.save(image, 'cars');
        });
    }
}

export { UploadCarImagesUseCase };
