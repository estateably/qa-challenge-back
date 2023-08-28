import { SearchTransactionDTO } from '../dtos/search-transaction.dto';
import { Transaction } from '../models/transaction.model';

export interface ITransactionRepository {
  createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction>;
  getAllTransactions(): Promise<Transaction[]>;
  getTransactionById(objectId: string): Promise<Transaction>;

  searchTransactions(
    searchTransactionDTO: SearchTransactionDTO,
  ): Promise<Transaction[]>;
  deleteTransaction(objectId: string): Promise<void>;
}
