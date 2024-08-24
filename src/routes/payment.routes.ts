import {
  acceptPayments,
  verifyPayments,
} from '../controllers/payments.controller';
import { Router } from 'express';

const PaymentRouter = Router();

PaymentRouter.post('/pay', acceptPayments).post(
  '/verify-payment/:id',
  verifyPayments,
);

export default PaymentRouter;
