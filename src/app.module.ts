import { Module } from '@nestjs/common'
import { EnvConfigModule } from './shared/infra/env-config/env-config.module'
import { UsersModule } from './users/infra/users.module'

@Module({
  imports: [EnvConfigModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
