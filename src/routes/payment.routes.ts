import {
  acceptPayments,
  verifyPayments,
} from '../controllers/payments.controller';
import { Router } from 'express';

const PaymentRouter = Router();

PaymentRouter.post('/pay', acceptPayments).post('/verify:id', verifyPayments);

export default PaymentRouter;
