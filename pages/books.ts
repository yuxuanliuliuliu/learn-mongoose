import Book from '../models/book';
import Author from '../models/author';

export const showBooks = async (): Promise<string[] | void> => {
  try {
    const books = await Book.getAllBooks();
    return books.map((b) => {
      const authorName = new Author(b.author).name; // Assuming 'Author' returns the author's name
      return `${b._id} : ${b.title} : ${authorName}`;
    });
  } catch (err) {
    console.log('Could not get books ' + err);
  }
}
