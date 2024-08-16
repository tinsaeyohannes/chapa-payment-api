import type { Request, Response } from 'express';

const acceptPayments = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
};

export { acceptPayments };
