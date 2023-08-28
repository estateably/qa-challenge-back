import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './controllers/transactions.controller';
import { Transaction } from './models/transaction.model';
import { TransactionsService } from './services/transactions.service';
import { TransactionsSqliteRepository } from "./repositories/transactions-sqlite-repository.service";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    { provide: 'TRANSACTIONS_REPOSITORY', useClass: TransactionsSqliteRepository },
  ],
})
export class TransactionsModule {}
