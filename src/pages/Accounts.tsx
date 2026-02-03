import { useFinance } from '@/contexts/FinanceContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { AccountCard } from '@/components/finance/AccountCard';
import { AddAccountDialog } from '@/components/finance/AddAccountDialog';
import { Wallet } from 'lucide-react';

export default function Accounts() {
  const { accounts, deleteAccount } = useFinance();

  const pfAccounts = accounts.filter(a => a.type === 'PF');
  const pjAccounts = accounts.filter(a => a.type === 'PJ');

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Contas Bancárias</h1>
            <p className="text-muted-foreground">
              Gerencie suas contas PF e PJ
            </p>
          </div>
          <AddAccountDialog />
        </div>

        {accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <Wallet className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Nenhuma conta cadastrada</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Adicione sua primeira conta bancária clicando no botão acima
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {pfAccounts.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-pf" />
                  Pessoa Física (PF)
                </h2>
                <div className="grid gap-3">
                  {pfAccounts.map(account => (
                    <AccountCard 
                      key={account.id} 
                      account={account} 
                      onDelete={deleteAccount}
                    />
                  ))}
                </div>
              </section>
            )}

            {pjAccounts.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-pj" />
                  Pessoa Jurídica (PJ)
                </h2>
                <div className="grid gap-3">
                  {pjAccounts.map(account => (
                    <AccountCard 
                      key={account.id} 
                      account={account} 
                      onDelete={deleteAccount}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
