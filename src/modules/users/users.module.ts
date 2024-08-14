import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { GoogleSheetsModule } from 'src/modules/google-sheets/google-sheets.module';
import { UsersService } from './users.service';
import { GoogleSheetsService } from 'src/modules/google-sheets/google-sheets.service';

@Module({
  imports: [GoogleSheetsModule],
  controllers: [UsersController],
  providers: [UsersService, GoogleSheetsService],
})
export class UsersModule {}
