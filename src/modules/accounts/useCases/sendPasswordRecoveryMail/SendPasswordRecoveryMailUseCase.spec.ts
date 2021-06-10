import { hash } from 'bcryptjs';

import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/Dayjs';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendPasswordRecoveryMailUseCase } from './SendPasswordRecoveryMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let sendPasswordRecoveryMailUseCase: SendPasswordRecoveryMailUseCase;

describe('Send Password Recovery Mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();

        sendPasswordRecoveryMailUseCase = new SendPasswordRecoveryMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it('Should be able to send a password recovery mail to user', async () => {
        const sendMail = spyOn(mailProvider, 'sendMail');

        await usersRepositoryInMemory.create({
            name: 'José',
            email: 'jose@mail.com',
            driver_license: '123456789',
            password: await hash('password', 8),
        });

        await sendPasswordRecoveryMailUseCase.execute('jose@mail.com');

        expect(sendMail).toHaveBeenCalled();
    });

    it('Should not be able to send recovery mail if user does not exist', async () => {
        await expect(
            sendPasswordRecoveryMailUseCase.execute('gilmar@mail.com')
        ).rejects.toEqual(new AppError('User does not exist!'));
    });

    it('Should be able to create an user token', async () => {
        const generateMailToken = spyOn(
            usersTokensRepositoryInMemory,
            'create'
        );

        await usersRepositoryInMemory.create({
            name: 'Roberto',
            email: 'roberto@mail.com',
            driver_license: '123456789',
            password: await hash('password', 8),
        });

        await sendPasswordRecoveryMailUseCase.execute('roberto@mail.com');

        expect(generateMailToken).toBeCalled();
    });
});
