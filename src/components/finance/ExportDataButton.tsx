import { Button } from '@/components/ui/button';
import { useFinance } from '@/contexts/FinanceContext';
import { Download } from 'lucide-react';
import { format } from 'date-fns';

export function ExportDataButton() {
  const { accounts, transactions } = useFinance();

  const exportToCSV = () => {
    // Cria CSV das contas
    const accountsHeader = 'ID,Banco,Tipo,Saldo,Criado Em\n';
    const accountsRows = accounts.map(a => 
      `${a.id},"${a.bankName}",${a.type},${a.balance.toFixed(2)},${format(new Date(a.createdAt), 'dd/MM/yyyy')}`
    ).join('\n');
    const accountsCSV = accountsHeader + accountsRows;

    // Cria CSV das transações
    const transactionsHeader = 'ID,Tipo,Valor,Categoria,Conta ID,Data,Descrição,Criado Em\n';
    const transactionsRows = transactions.map(t => 
      `${t.id},${t.type},${t.amount.toFixed(2)},"${t.category}",${t.accountId},${format(new Date(t.date), 'dd/MM/yyyy')},"${t.description || ''}",${format(new Date(t.createdAt), 'dd/MM/yyyy')}`
    ).join('\n');
    const transactionsCSV = transactionsHeader + transactionsRows;

    // Combina os CSVs
    const fullCSV = `=== CONTAS ===\n${accountsCSV}\n\n=== TRANSAÇÕES ===\n${transactionsCSV}`;

    // Cria e baixa o arquivo
    const blob = new Blob([fullCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fincontrol_backup_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" size="sm" onClick={exportToCSV}>
      <Download className="h-4 w-4 mr-2" />
      Exportar CSV
    </Button>
  );
}
