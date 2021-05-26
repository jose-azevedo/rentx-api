import { AppError } from '@errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it('Should be able to create new category', async () => {
        const category = {
            name: 'SUV',
            description: 'Carros grandes',
        };

        await createCategoryUseCase.execute(category);

        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty('id');
    });

    it('Should not be able to create category with an existing name', async () => {
        expect(async () => {
            const category = {
                name: 'SUV',
                description: 'Carros grandes',
            };

            await createCategoryUseCase.execute(category);

            await createCategoryUseCase.execute(category);
        }).rejects.toBeInstanceOf(AppError);
    });
});
