import { Response } from 'express';
import Book  from '../models/book';
import BookInstance, { IBookInstance }  from '../models/bookinstance';
import express from 'express';

const router = express.Router();


router.get('/', async (req, res) => {
  const id = req.query.id as string;
  try {
    const [book, copies] = await Promise.all([
      Book.getBook(id),
      BookInstance.getBookDetails(id)
    ]);

    if (!book) {
      res.status(404).send(`Book ${id} not found`);
      return;
    }

    res.send({
      title: book.title,
      author: book.author.name,
      copies: copies
    });
  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).send(`Error fetching book ${id}`);
  }
});

export default router;