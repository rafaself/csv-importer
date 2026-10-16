import { loadApiConfig } from '@csv/config';
import { registerAs } from '@nestjs/config';

export const apiConfig = registerAs('api', () => loadApiConfig(process.env));
