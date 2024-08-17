import type { Request, Response } from 'express';

const acceptPayments = async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      'https://api.chapa.co/v1/transaction/initialize',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        },
        body: JSON.stringify(req.body),
      },
    );

    if (!response.ok) {
      const { error } = await response.json();
      return res.status(500).json({ error });
    }

    const { reference } = await response.json();

    res.status(200).json({ reference });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
};

export { acceptPayments };
