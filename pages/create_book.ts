import { Request, Response } from 'express';
import Book from '../models/book';
import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.post('/', async (req: Request, res: Response) => {
  const { familyName, firstName, genreName, bookTitle } = req.body;
  if (familyName && firstName && genreName && bookTitle) {
    try {
      const book = new Book({});
      await book.saveBookOfExistingAuthorAndGenre(familyName, firstName, genreName, bookTitle);
      res.send('Created new book: ' + book);
    } catch (err: unknown) {
      res.status(500).send('Error creating book: ' + (err as Error).message);
    }
  } else {
    res.send('Invalid Inputs');
  }
});

export default router;