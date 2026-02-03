import { ArrowDownCircle, ArrowUpCircle, Trash2 } from 'lucide-react';
import { Transaction, BankAccount } from '@/types/finance';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionCardProps {
  transaction: Transaction;
  account?: BankAccount;
  onDelete: (id: string) => void;
}

export function TransactionCard({ transaction, account, onDelete }: TransactionCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const isIncome = transaction.type === 'income';

  return (
    <div className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          isIncome ? "bg-income/10" : "bg-expense/10"
        )}>
          {isIncome ? (
            <ArrowUpCircle className="h-5 w-5 text-income" />
          ) : (
            <ArrowDownCircle className="h-5 w-5 text-expense" />
          )}
        </div>
        
        <div>
          <p className="font-medium text-foreground">{transaction.category}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{account?.bankName || 'Conta removida'}</span>
            <span>•</span>
            <span>{format(new Date(transaction.date), "dd MMM yyyy", { locale: ptBR })}</span>
          </div>
          {transaction.description && (
            <p className="text-sm text-muted-foreground mt-1">{transaction.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className={cn(
          "text-lg font-semibold",
          isIncome ? "text-income" : "text-expense"
        )}>
          {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
        </p>
        
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(transaction.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
