import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { BankAccount, Transaction, AccountType, TransactionType } from '@/types/finance';

interface FinanceContextType {
  accounts: BankAccount[];
  transactions: Transaction[];
  addAccount: (account: Omit<BankAccount, 'id' | 'createdAt'>) => void;
  deleteAccount: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  deleteTransaction: (id: string) => void;
  getTotalBalance: (type: AccountType) => number;
  getAccountBalance: (accountId: string) => number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addAccount = useCallback((account: Omit<BankAccount, 'id' | 'createdAt'>) => {
    const newAccount: BankAccount = {
      ...account,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setAccounts(prev => [...prev, newAccount]);
  }, []);

  const deleteAccount = useCallback((id: string) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
    setTransactions(prev => prev.filter(t => t.accountId !== id));
  }, []);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTransactions(prev => [...prev, newTransaction]);

    // Update account balance
    setAccounts(prev => prev.map(account => {
      if (account.id === transaction.accountId) {
        const balanceChange = transaction.type === 'income' 
          ? transaction.amount 
          : -transaction.amount;
        return { ...account, balance: account.balance + balanceChange };
      }
      return account;
    }));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    // Revert the balance change
    setAccounts(prev => prev.map(account => {
      if (account.id === transaction.accountId) {
        const balanceChange = transaction.type === 'income' 
          ? -transaction.amount 
          : transaction.amount;
        return { ...account, balance: account.balance + balanceChange };
      }
      return account;
    }));

    setTransactions(prev => prev.filter(t => t.id !== id));
  }, [transactions]);

  const getTotalBalance = useCallback((type: AccountType) => {
    return accounts
      .filter(account => account.type === type)
      .reduce((sum, account) => sum + account.balance, 0);
  }, [accounts]);

  const getAccountBalance = useCallback((accountId: string) => {
    const account = accounts.find(a => a.id === accountId);
    return account?.balance ?? 0;
  }, [accounts]);

  const value = useMemo(() => ({
    accounts,
    transactions,
    addAccount,
    deleteAccount,
    addTransaction,
    deleteTransaction,
    getTotalBalance,
    getAccountBalance,
  }), [accounts, transactions, addAccount, deleteAccount, addTransaction, deleteTransaction, getTotalBalance, getAccountBalance]);

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}
