import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import googleConfig from './config/google.config';
import { GoogleSheetsModule } from './modules/google-sheets/google-sheets.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    GoogleSheetsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.dev'],
      isGlobal: true,
      load: [googleConfig],
    }),
    UsersModule,
  ],
})
export class AppModule {}
