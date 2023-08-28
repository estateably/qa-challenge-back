import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import {
  TransactionCategory,
  TransactionType,
} from '../models/transaction.model';

export class CreateTransactionDto {
  @ApiProperty({
    example: 'Burger Queen Order',
    description: 'The name of the transaction',
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: TransactionCategory.FOOD,
    description: "The transactions' category",
    enum: TransactionCategory,
  })
  @IsNotEmpty({
    message: 'Category is required',
  })
  @IsEnum(TransactionCategory)
  category: TransactionCategory;

  @ApiProperty({
    description: "The transactions' type",
    example: TransactionType.EXPENSE,
    enum: TransactionType,
  })
  @IsNotEmpty({ message: 'Type is required' })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({
    description: "The transactions' value",
    example: 25.9,
  })
  @IsNotEmpty({ message: 'Number is required' })
  value: number;

  @ApiProperty({ description: "The transactions' date" })
  @IsNotEmpty({ message: 'Date is required' })
  date: Date;
}
