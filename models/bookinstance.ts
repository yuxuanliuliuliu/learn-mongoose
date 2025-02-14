import mongoose, { Schema, Document, Model } from 'mongoose';
import { IBook } from './book';

// Define an interface for the BookInstance document
export interface IBookInstance extends Document {
  book: IBook;
  imprint: string;
  status: 'Available' | 'Maintenance' | 'Loaned' | 'Reserved';
  due_back: Date;
}

export interface IBookInstanceModel extends Model<IBookInstance> {
  getBookDetails(id: string): Promise<IBookInstance[]>;
  getAllBookStatuses(): string[];
}

var BookInstanceSchema: Schema<IBookInstance> = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: { type: String, required: true },
    status: { type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance' },
    due_back: { type: Date, default: Date.now }
  }
);

BookInstanceSchema.statics.getBookDetails = async function (id: string): Promise<IBookInstance[]> {
  return BookInstance.find({ book: id }).select('imprint status').exec();
}

BookInstanceSchema.statics.getAllBookStatuses = async function (): Promise<string[]> {
  const listBookInstances: IBookInstance[] = await BookInstance
    .find({ status: { $eq: 'Available' } })
    .populate('book');

  const results = listBookInstances.map((bookInstance) => {
    return `${bookInstance.book.title} : ${bookInstance.status}`;
  });
  return results;
}


// Export the model
const BookInstance = mongoose.model<IBookInstance, IBookInstanceModel>('BookInstance', BookInstanceSchema);
export default BookInstance;