import { Injectable } from '@nestjs/common';
import { EnvConfig } from './shared/infra/env-config/env-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getAppPort(): number {
    return Number(this.configService.get<number>('PORT'));
  }

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }
}
