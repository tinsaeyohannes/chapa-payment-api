import { acceptPayments } from '../controllers/payments.controller';
import { Router } from 'express';

const PaymentRouter = Router();

PaymentRouter.post('/acceptPayment', acceptPayments);

export default PaymentRouter;
