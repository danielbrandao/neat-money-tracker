import { useFinance } from '@/contexts/FinanceContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { TransactionCard } from '@/components/finance/TransactionCard';
import { AddTransactionDialog } from '@/components/finance/AddTransactionDialog';
import { ArrowLeftRight } from 'lucide-react';

export default function Transactions() {
  const { accounts, transactions, deleteTransaction } = useFinance();

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Lançamentos</h1>
            <p className="text-muted-foreground">
              Histórico de ganhos e gastos
            </p>
          </div>
          <div className="flex gap-2">
            <AddTransactionDialog defaultType="income" />
            <AddTransactionDialog defaultType="expense" />
          </div>
        </div>

        {accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <ArrowLeftRight className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Cadastre uma conta primeiro</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Para registrar lançamentos, você precisa ter pelo menos uma conta bancária cadastrada
            </p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <ArrowLeftRight className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Nenhum lançamento</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Registre seu primeiro ganho ou gasto usando os botões acima
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {sortedTransactions.map(transaction => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                account={accounts.find(a => a.id === transaction.accountId)}
                onDelete={deleteTransaction}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
