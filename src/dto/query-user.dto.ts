import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class QueryUserDTO {
  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  firstName?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  firstNameOperator?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  lastName?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  lastNameOperator?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsEmail()
  email?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  emailOperator?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(100)
  telefono?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  telefonoOperator?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(100)
  ciudad?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  ciudadOperator?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(100)
  pais?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  paisOperator?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(100)
  role?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  roleOperator?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber()
  page?: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber()
  limit?: number;
}
