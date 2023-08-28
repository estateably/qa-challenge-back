import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  category: TransactionCategory;

  @Column()
  type: TransactionType;

  @Column()
  value: number;

  @Column()
  date: Date;
}

export enum TransactionCategory {
  SALARY = 'Salary',
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  HOUSE = 'House',
  OTHER = 'Other',
}

export enum TransactionType {
  INCOME = 'Income',
  EXPENSE = 'Expense',
}
