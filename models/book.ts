import mongoose, { Schema, Document, Model, FilterQuery } from 'mongoose';
import Author, { IAuthor } from './author';
import Genre, { IGenre } from './genre';

// Define an interface for the Book document
export interface IBook extends Document {
  title: string;
  author: IAuthor;
  summary: string;
  isbn: string;
  genre: IGenre[];
  saveBookOfExistingAuthorAndGenre(author_family_name: string, author_first_name: string, genre_name: string, title: string): Promise<IBook>;
}

interface IBookModel extends Model<IBook> {
  getBook(id: string): Promise<IBook | null>;
  getAllBooksWithAuthors(projectionOpts: string, sortOpts?: { [key: string]: 1 | -1 }): Promise<IBook[]>;
  getBookCount(fitler?: FilterQuery<IBook>): Promise<number>;
}

const BookSchema: Schema<IBook> = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }]
  }
);

BookSchema.statics.getBook = async function (id: string): Promise<IBook | null> {
  return this.findById(id).populate('author').populate('genre').exec();
}

BookSchema.statics.getAllBooksWithAuthors = async function (projection: string, sortOpts?: { [key: string]: 1 | -1 }): Promise<IBook[]> {
  if(sortOpts) {
    return Book.find({}, projection)
    .sort(sortOpts)
    .populate('author');
  }
  return Book.find({}, projection).populate('author');
}

BookSchema.statics.getBookCount = async function (filter?: FilterQuery<IBook>): Promise<number> {
  return this.countDocuments(filter || {});
}

BookSchema.methods.saveBookOfExistingAuthorAndGenre = async function (author_family_name: string, author_first_name: string, genre_name: string, title: string): Promise<IBook> {
  const authorId = await Author.getAuthorIdByName(author_family_name, author_first_name);
  const genreId = await Genre.getGenreIdByName(genre_name);
  if(!authorId || !genreId) {
    throw new Error('Author or genre not found');
  }
  this.title = title;
  this.summary = 'Demo Summary to be updated later';
  this.isbn = 'ISBN2022';
  this.author = authorId;
  this.genre = [genreId];
  return await this.save();  
}

// Export the model
const Book = mongoose.model<IBook, IBookModel>('Book', BookSchema);
export default Book;
