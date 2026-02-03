import { Building2, Trash2 } from 'lucide-react';
import { BankAccount } from '@/types/finance';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AccountCardProps {
  account: BankAccount;
  onDelete: (id: string) => void;
}

export function AccountCard({ account, onDelete }: AccountCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const isPositive = account.balance >= 0;

  return (
    <div className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          account.type === 'PF' ? "bg-pf/10" : "bg-pj/10"
        )}>
          <Building2 className={cn(
            "h-6 w-6",
            account.type === 'PF' ? "text-pf" : "text-pj"
          )} />
        </div>
        
        <div>
          <p className="font-medium text-foreground">{account.bankName}</p>
          <span className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            account.type === 'PF' 
              ? "bg-pf/10 text-pf" 
              : "bg-pj/10 text-pj"
          )}>
            {account.type}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className={cn(
          "text-lg font-semibold",
          isPositive ? "text-foreground" : "text-destructive"
        )}>
          {formatCurrency(account.balance)}
        </p>
        
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(account.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
