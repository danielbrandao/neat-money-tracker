import { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { TransactionType, CATEGORIES } from '@/types/finance';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddTransactionDialogProps {
  defaultType?: TransactionType;
}

export function AddTransactionDialog({ defaultType = 'expense' }: AddTransactionDialogProps) {
  const { accounts, addTransaction } = useFinance();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TransactionType>(defaultType);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [accountId, setAccountId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !accountId) return;

    addTransaction({
      type,
      amount: parseFloat(amount),
      category,
      accountId,
      date: new Date(date),
      description: description.trim() || undefined,
    });

    setAmount('');
    setCategory('');
    setAccountId('');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setOpen(false);
  };

  const isIncome = type === 'income';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={isIncome ? "income" : "expense"}
          className="gap-2"
        >
          {isIncome ? (
            <ArrowUpCircle className="h-4 w-4" />
          ) : (
            <ArrowDownCircle className="h-4 w-4" />
          )}
          {isIncome ? 'Novo Ganho' : 'Novo Gasto'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isIncome ? 'Adicionar Ganho' : 'Adicionar Gasto'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={type === 'income' ? 'income' : 'outline'}
              className="flex-1 gap-2"
              onClick={() => setType('income')}
            >
              <ArrowUpCircle className="h-4 w-4" />
              Ganho
            </Button>
            <Button
              type="button"
              variant={type === 'expense' ? 'expense' : 'outline'}
              className="flex-1 gap-2"
              onClick={() => setType('expense')}
            >
              <ArrowDownCircle className="h-4 w-4" />
              Gasto
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES[type].map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account">Conta</Label>
            <Select value={accountId} onValueChange={setAccountId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma conta" />
              </SelectTrigger>
              <SelectContent>
                {accounts.length === 0 ? (
                  <SelectItem value="none" disabled>
                    Nenhuma conta cadastrada
                  </SelectItem>
                ) : (
                  accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.bankName} ({account.type})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Observação (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Descrição do lançamento..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={accounts.length === 0}
          >
            {accounts.length === 0 ? 'Cadastre uma conta primeiro' : 'Adicionar Lançamento'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
