import type { Request, Response } from 'express';
const { CALLBACK_URL, RETURN_URL } = process.env;

const acceptPayments = async (req: Request, res: Response) => {
  const {
    amount,
    currency,
    email,
    first_name,
    last_name,
    tx_ref,
  }: {
    amount: string;
    currency: string;
    email: string;
    first_name: string;
    last_name: string;
    tx_ref: string;
  } = req.body;

  if (!amount || currency || email || !first_name || !last_name || !tx_ref) {
    res.status(400).json('All fields are required!');
    return;
  }

  const reqData = {
    amount,
    currency,
    email,
    first_name,
    last_name,
    callback_url: CALLBACK_URL,
    return_url: RETURN_URL,
  };

  try {
    const response = await fetch(
      'https://api.chapa.co/v1/transaction/initialize',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        },
        body: JSON.stringify(reqData),
      },
    );

    if (!response.ok) {
      const { error } = await response.json();
      return res.status(500).json({ error });
    }
    const data = await response.json();

    console.log('data=', data);

    res.redirect(data.checkout_url);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
};

const verifyPayments = async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `https://api.chapa.co/v1/transaction/verify/${req.params.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        },
      },
    );

    if (!response.ok) {
      const { error } = await response.json();
      return res.status(500).json({ error });
    }
    const data = await response.json();

    res
      .status(200)
      .json({ message: 'Payment was successfully verified', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment can't be verfied", error });
  }
};

export { acceptPayments, verifyPayments };
