import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository, Like } from 'typeorm';
import { SearchTransactionDTO } from '../dtos/search-transaction.dto';
import { Transaction } from '../models/transaction.model';
import { ITransactionRepository } from './ITransaction.repository';
import { v4 as uuid } from 'uuid';

@EntityRepository(Transaction)
@Injectable()
export class TransactionsSqliteRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly mongoRepository: Repository<Transaction>,
  ) {}

  async deleteTransaction(objectId: string): Promise<void> {
    this.mongoRepository.delete(objectId);
  }

  async searchTransactions(
    searchTransactionDTO: SearchTransactionDTO,
  ): Promise<Transaction[]> {
    Object.keys(searchTransactionDTO).forEach(
      (filter) =>
        searchTransactionDTO[filter] === undefined &&
        delete searchTransactionDTO[filter],
    );

    console.log(searchTransactionDTO);
    const keyword = searchTransactionDTO.keyword
      ? `(name LIKE '%${searchTransactionDTO.keyword}%' ${
          Number(searchTransactionDTO.keyword)
            ? 'OR value =' + Number(searchTransactionDTO.keyword)
            : ''
        } ) `
      : "name LIKE '%%'";

    const Querytype = searchTransactionDTO.type
      ? `type= '${searchTransactionDTO.type}'`
      : '';

    const Querycategory = searchTransactionDTO.category
      ? `category='${searchTransactionDTO.category}'`
      : '';

    const QueryList = [Querytype, Querycategory, keyword];

    const sqliteQuery = this.mongoRepository.find({
      where: QueryList.filter((query) => query !== '').join(' AND '),
    });

    return sqliteQuery;
  }

  async createTransaction(
    transaction: Omit<Transaction, 'id'>,
  ): Promise<Transaction> {
    const newTransaction = { ...transaction, id: uuid() };

    return this.mongoRepository.save(newTransaction);
  }

  getTransactionById(objectId: string): Promise<Transaction> {
    return this.mongoRepository.findOne(objectId);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.mongoRepository.find();
  }
}
