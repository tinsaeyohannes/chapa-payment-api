import { acceptPayments } from '../controllers/payments.controller';
import { Router } from 'express';

const PaymentRouter = Router();

PaymentRouter.post('/pay', acceptPayments);

export default PaymentRouter;
