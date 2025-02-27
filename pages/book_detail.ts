import express from 'express';
import { Request, Response } from 'express';
import Book, { IBook } from '../models/book'
import BookInstance, { IBookInstance } from '../models/bookinstance';


const router = express.Router();

router.get('/', async(req: Request, res: Response) => {
        const bookId = req.query.id as string
        try{
            const book  = await Book.findById(bookId).populate('author')
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }
            const bookInstances = await BookInstance.find({ book: bookId }).select('imprint status');
            const response = {
                book_title: book.title,
                author_name: `${book.author.family_name}, ${book.author.first_name}`,
                copies: bookInstances.map(instance => ({
                    imprint: instance.imprint,
                    status: instance.status
                }))
            };
            res.status(200).json(response);
        } catch (error) {
            console.error('Error processing request:', error);
            res.send('No authors found');
        }
    }
)

export default router