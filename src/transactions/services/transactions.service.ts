import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { SearchTransactionDTO } from '../dtos/search-transaction.dto';
import { Transaction } from '../models/transaction.model';
import { ITransactionRepository } from '../repositories/ITransaction.repository';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private transactionsRepository: ITransactionRepository,
  ) {}

  public async getAllTransactions(): Promise<Transaction[]> {
    const found = await this.transactionsRepository.getAllTransactions();
    return found;
  }

  public async getTransactionById(objectId: string): Promise<Transaction> {
    const foundTransaction =
      await this.transactionsRepository.getTransactionById(objectId);

    if (!foundTransaction) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }

    return foundTransaction;
  }

  public async searchTransactions(filter: SearchTransactionDTO) {
    return await this.transactionsRepository.searchTransactions(filter);
  }

  public async createTransaction(
    createFinanceDTO: CreateTransactionDto,
  ): Promise<Transaction> {
    const { name, type, category, value, date } = createFinanceDTO;

    const newTransaction = {
      name,
      type,
      category,
      value,
      date,
    };
    const mongoCreatedTransaction =
      await this.transactionsRepository.createTransaction(newTransaction);
    return mongoCreatedTransaction;
  }

  async deleteTransaction(objectId: string): Promise<void> {
    await this.getTransactionById(objectId);
    await this.transactionsRepository.deleteTransaction(objectId);
  }
}
