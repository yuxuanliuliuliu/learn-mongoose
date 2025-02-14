import mongoose, { Schema, Document, Model } from 'mongoose';
import { IAuthor } from './author';
import { IGenre } from './genre';

// Define an interface for the Book document
export interface IBook extends Document {
  title: string;
  author: IAuthor;
  summary: string;
  isbn: string;
  genre: IGenre[];
}

interface IBookModel extends Model<IBook> {
  getBook(id: string): Promise<IBook | null>;
  getAllBooks(): Promise<IBook[]>;
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

BookSchema.statics.getAllBooks = async function (): Promise<IBook[]> {
  return Book.find({}, 'title author')
    .sort({ title: 1 })  // 1 indicates ascending order
    .populate('author');
}

// Export the model
const Book = mongoose.model<IBook, IBookModel>('Book', BookSchema);
export default Book;
