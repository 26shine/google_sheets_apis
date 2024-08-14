import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GoogleSheetsService } from 'src/modules/google-sheets/google-sheets.service';
import { RollCallDto } from './dto/roll-call.dto';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private gsService: GoogleSheetsService,
  ) {}

  @Get(':id')
  async getInfoById(@Param('id') userId: string) {
    const value = await this.userService.getInfoById(userId);
    const info = this.gsService.mapRowsToObjectList(value)[0];

    if (!info['MÃ SỐ']) {
      throw new HttpException(
        'Không tìm thấy thông tin thiếu nhi',
        HttpStatus.NOT_FOUND,
      );
    }

    return info;
  }

  @Post(':id/roll-call')
  async rollCallByUserId(
    @Param('id') userId: string,
    @Body() body: RollCallDto,
  ) {
    try {
      return this.userService.rollCallByUserId(userId, body);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
