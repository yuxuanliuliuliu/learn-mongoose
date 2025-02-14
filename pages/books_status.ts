import { Response } from 'express';
import BookInstance, { IBookInstance } from '../models/bookinstance';

// Function to show all books with status "Available"
export const showAllBooksStatus = async (res: Response): Promise<void> => {
  try {
    const results = await BookInstance.getAllBookStatuses();
    res.status(200).send(results);
  }
  catch (err) {
    res.status(500).send('Status not found');
  }
};
