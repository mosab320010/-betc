import { Router } from 'express';
import { getWallet } from '../controllers/BlockchainController.js';

export const blockchainRouter = Router();

blockchainRouter.get('/wallet', getWallet);
