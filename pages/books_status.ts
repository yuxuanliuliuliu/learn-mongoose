import { Response } from 'express';
import BookInstance, { IBookInstance } from '../models/bookinstance';
import express from 'express';

const router = express.Router();

router.get('/', async (_, res: Response) => {
  try {
    const results = await BookInstance.getAllBookStatuses();
    res.status(200).send(results);
  }
  catch (err) {
    res.status(500).send('Status not found');
  }
});

export default router;