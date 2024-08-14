import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GoogleSheetsService } from '../google-sheets/google-sheets.service';
import { format } from 'date-fns';
import { RollCallDto } from './dto/roll-call.dto';

@Injectable()
export class UsersService {
  constructor(private readonly gsService: GoogleSheetsService) {}
  async getInfoById(valueToSearch: string) {
    try {
      const spreadSheetId = process.env.PRIMARY_SPREADSHEET_ID;
      const sheetName = 'Danh sách';
      const range = 'A1:Y10000';

      const [key, ...values] = await this.gsService.findAll(
        spreadSheetId,
        sheetName,
        range,
      );

      const info = [];
      for (let rowIndex = 0; rowIndex < values.length; rowIndex++) {
        const row = values[rowIndex];
        const cellIndex = row.indexOf(valueToSearch);
        if (cellIndex !== -1) {
          info.push(...row);
          break;
        }
      }

      return [key, info];
    } catch (e) {
      console.log({ error: e.message });
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async rollCallByUserId(userId: string, body: RollCallDto) {
    try {
      if (!body.onCallDate) {
        throw new HttpException(
          'Vui lòng chọn ngày điểm danh',
          HttpStatus.BAD_REQUEST,
        );
      }
      const spreadSheetId = process.env.PRIMARY_SPREADSHEET_ID;
      const sheetName = 'Điểm danh';
      const newValue = !body.isLate ? 'X' : 'Đi muộn';

      const dataRollCall = {
        spreadSheetId,
        sheetName,
        newValue,
        rowValue: userId,
        columnValue: body.onCallDate,
      };

      await this.gsService.findAndUpdateCell(dataRollCall);

      return { updatedRange: 'Đã điểm danh' };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
