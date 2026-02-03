import { useFinance } from '@/contexts/FinanceContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { BalanceCard } from '@/components/finance/BalanceCard';
import { AccountCard } from '@/components/finance/AccountCard';
import { TransactionCard } from '@/components/finance/TransactionCard';
import { AddTransactionDialog } from '@/components/finance/AddTransactionDialog';
import { AddAccountDialog } from '@/components/finance/AddAccountDialog';
import { ExportDataButton } from '@/components/finance/ExportDataButton';
import { Wallet } from 'lucide-react';

export default function Dashboard() {
  const { 
    accounts, 
    transactions, 
    getTotalBalance, 
    deleteAccount,
    deleteTransaction 
  } = useFinance();

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral das suas finanças
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExportDataButton />
            <AddTransactionDialog defaultType="income" />
            <AddTransactionDialog defaultType="expense" />
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <BalanceCard type="PF" balance={getTotalBalance('PF')} />
          <BalanceCard type="PJ" balance={getTotalBalance('PJ')} />
        </div>

        {/* Accounts Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Contas Bancárias</h2>
            <AddAccountDialog />
          </div>

          {accounts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <Wallet className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">Nenhuma conta cadastrada</p>
              <p className="text-sm text-muted-foreground">
                Adicione sua primeira conta bancária para começar
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {accounts.map(account => (
                <AccountCard 
                  key={account.id} 
                  account={account} 
                  onDelete={deleteAccount}
                />
              ))}
            </div>
          )}
        </section>

        {/* Recent Transactions */}
        {recentTransactions.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">Lançamentos Recentes</h2>
            <div className="grid gap-3">
              {recentTransactions.map(transaction => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  account={accounts.find(a => a.id === transaction.accountId)}
                  onDelete={deleteTransaction}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </AppLayout>
  );
}
