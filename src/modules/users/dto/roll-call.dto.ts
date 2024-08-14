import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class RollCallDto {
  @IsOptional()
  @ApiProperty({
    name: 'isLate',
    required: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isLate?: boolean;

  @ApiProperty({
    name: 'onCallDate',
    required: false,
  })
  @IsString()
  onCallDate: string;
}
