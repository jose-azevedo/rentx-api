import { container } from 'tsyringe';

import { IDateProvider } from './IDateProvider';
import { DayjsDateProvider } from './implementations/Dayjs';

container.registerSingleton<IDateProvider>(
    'DayjsDateProvider',
    DayjsDateProvider
);
