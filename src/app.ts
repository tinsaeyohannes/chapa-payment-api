import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import PaymentRouter from './routes/payment.routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('tiny'));

app.use(
  helmet.crossOriginEmbedderPolicy({ policy: 'require-corp' }), // Disable CSP
);

app.use(
  helmet.hsts({
    maxAge: 86400, // 60 days
    includeSubDomains: false,
  }),
);

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.set('view engine', 'ejs');

// entry for the front end
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/payment-success', async (req, res) => {
  res.render('success');
});

app.use('/api', PaymentRouter);

export default app;
