import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/Dayjs';

container.registerSingleton<IDateProvider>(
    'DayjsDateProvider',
    DayjsDateProvider
);
