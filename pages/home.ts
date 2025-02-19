import express from 'express';
import { Response } from 'express';
import Book from '../models/book';
import Author from '../models/author';
import BookInstance from '../models/bookinstance';
import Genre from '../models/genre';

const router = express.Router();

async function show_home(): Promise<string> {
  const booksCount = await Book.getBookCount();
  const copiesCount = await BookInstance.getBookInstanceCount();
  const availableCount = await BookInstance.getBookInstanceCount({ status: 'Available' });
  const authorsCount = await Author.getAuthorCount();
  const genresCount = await Genre.getGenreCount();

  const msg = `
      <div>
        <p>Books: ${booksCount}</p>
        <p>Copies: ${copiesCount}</p>
        <p>Copies Available: ${availableCount}</p>
        <p>Authors: ${authorsCount}</p>
        <p>Genres: ${genresCount}</p>
      </div>
    `;
  return msg;
}

router.get('/stats', async (_, res: Response) => {
  try {
    const msg = await show_home();
    res.send(msg);
  }
  catch (err: unknown) {
    res.status(500).send('Error retrieving home data: ' + (err as Error).message);
  }
});

export default router;