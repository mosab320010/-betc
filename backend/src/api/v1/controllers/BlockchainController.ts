import type { Request, Response } from 'express';

export const getWallet = (_req: Request, res: Response) => {
  res.status(200).json({ address: '0x0000000000000000000000000000000000000000' });
};
