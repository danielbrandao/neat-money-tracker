export type AccountType = 'PF' | 'PJ';
export type TransactionType = 'income' | 'expense';

export interface BankAccount {
  id: string;
  bankName: string;
  type: AccountType;
  balance: number;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  accountId: string;
  date: Date;
  description?: string;
  createdAt: Date;
}

export const CATEGORIES = {
  income: [
    'Salário',
    'Freelance',
    'Investimentos',
    'Vendas',
    'Outros'
  ],
  expense: [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Lazer',
    'Impostos',
    'Serviços',
    'Outros'
  ]
} as const;
