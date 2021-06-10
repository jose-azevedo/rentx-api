import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SendPasswordRecoveryMailUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
        @inject('EtherealMailProvider')
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findUserByEmail(email);

        if (!user) {
            throw new AppError('User does not exist!');
        }

        const token = uuidv4();

        const expiration_date = this.dateProvider.addHours(3);

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expiration_date,
        });

        const variables = {
            name: user.name,
            link: `${process.env.PASSWORD_RECOVERY_URL}${token}`,
        };

        const templatePath = resolve(
            __dirname,
            '..',
            '..',
            'views',
            'emails',
            'passwordRecoveryEmail.hbs'
        );

        this.mailProvider.sendMail(
            email,
            'Recuperação de senha',
            variables,
            templatePath
        );
    }
}

export { SendPasswordRecoveryMailUseCase };
