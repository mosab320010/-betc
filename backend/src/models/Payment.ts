export type Payment = {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed';
};
