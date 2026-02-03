import { cn } from '@/lib/utils';
import { AccountType } from '@/types/finance';

interface BalanceCardProps {
  type: AccountType;
  balance: number;
}

export function BalanceCard({ type, balance }: BalanceCardProps) {
  const isPositive = balance >= 0;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl p-6 transition-all hover:shadow-lg",
      type === 'PF' ? "bg-card-pf" : "bg-card-pj"
    )}>
      <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-white/5" />
      <div className="absolute right-0 bottom-0 h-24 w-24 translate-x-4 translate-y-4 rounded-full bg-white/5" />
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <span className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            type === 'PF' 
              ? "bg-white/20 text-white" 
              : "bg-white/20 text-white"
          )}>
            {type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
          </span>
        </div>
        
        <p className="text-sm font-medium text-white/80 mb-1">Saldo Total {type}</p>
        
        <p className={cn(
          "text-3xl font-bold tracking-tight text-white",
          !isPositive && "text-red-200"
        )}>
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  );
}
