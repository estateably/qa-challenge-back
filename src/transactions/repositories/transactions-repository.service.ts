import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, MongoRepository } from 'typeorm';
import { SearchTransactionDTO } from '../dtos/search-transaction.dto';
import { Transaction } from '../models/transaction.model';
import { ITransactionRepository } from './ITransaction.repository';

@EntityRepository(Transaction)
@Injectable()
export class TransactionsRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly mongoRepository: MongoRepository<Transaction>,
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
      ? searchTransactionDTO.keyword
      : '';

    const type = searchTransactionDTO.type ? searchTransactionDTO.type : '';

    const category = searchTransactionDTO.category
      ? searchTransactionDTO.category
      : '';

    const query = this.mongoRepository.find({
      where: {
        $and: [
          {
            $or: [
              {
                name: { $regex: keyword, $options: 'i' },
              },
              { value: { $eq: Number(searchTransactionDTO.keyword) } },
            ],
          },
          {
            type: {
              $regex: type,
              $options: 'i',
            },
          },
          {
            category: { $regex: category, $options: 'i' },
          },
        ],
      },
    });
    return query;
  }

  async createTransaction(
    transaction: Omit<Transaction, 'id'>,
  ): Promise<Transaction> {
    return this.mongoRepository.save(transaction);
  }

  getTransactionById(objectId: string): Promise<Transaction> {
    return this.mongoRepository.findOne(objectId);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.mongoRepository.find();
  }
}
