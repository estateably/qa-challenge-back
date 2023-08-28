import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { SearchTransactionDTO } from '../dtos/search-transaction.dto';
import {
  Transaction,
  TransactionCategory,
  TransactionType,
} from '../models/transaction.model';
import { TransactionsService } from '../services/transactions.service';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get a list of all transactions',
  })
  @ApiOperation({
    description: 'Get a list of all transactions',
    summary: 'Get a list of all transactions',
  })
  public async getAllFinances(): Promise<Transaction[]> {
    return this.transactionsService.getAllTransactions();
  }

  @Get('/search')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get a list of all transactions within a search keyword',
  })
  @ApiQuery({
    name: 'keyword',
    description: "A keyword to be search in transactions\\' value or name",
    example: 'Subscription',
  })
  @ApiQuery({
    name: 'type',
    description: "The transaction's type",
    enum: TransactionType,
    example: TransactionType.EXPENSE,
  })
  @ApiQuery({
    name: 'category',
    description: "The transaction's category",
    enum: TransactionCategory,
    example: TransactionCategory.FOOD,
  })
  @ApiOperation({
    description: 'Get a list of all transactions within a search keyword',
    summary: 'Get a list of all transactions within a search keyword',
  })
  public async searchTransactions(
    @Query('keyword') keyword: string,
    @Query('type') type: TransactionType,
    @Query('category') category: TransactionCategory,
  ): Promise<Transaction[]> {
    const filter: SearchTransactionDTO = { keyword, type, category };
    return this.transactionsService.searchTransactions(filter);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Deletes the transaction however does not return anything',
  })
  @ApiParam({
    name: 'id',
    description: "The transactions' id to be deleted",
    example: '62435577aeb1e58f5a081d51',
  })
  @ApiOperation({
    description: 'Deletes the transaction however does not return anything',
    summary: 'Deletes the transaction however does not return anything',
  })
  public async deleteFinance(@Param('id') objectId: string): Promise<void> {
    return this.transactionsService.deleteTransaction(objectId);
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Creates a new transaction' })
  @ApiOperation({
    description: 'Creates a new transaction',
    summary: 'Creates a new transaction',
  })
  public async createFinance(
    @Body() createFinanceDTO: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.createTransaction(createFinanceDTO);
  }
}
