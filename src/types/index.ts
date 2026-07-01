export interface Recipient {
  id: string;
  name: string;
  publicKey: string;
  amountPHPT: string;
  status: 'pending' | 'validated' | 'missing_trustline';
}
