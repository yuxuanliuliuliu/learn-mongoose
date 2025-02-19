import mongoose, { Schema, Document, Model, FilterQuery, ObjectId } from 'mongoose';

// Define an interface for the Genre document
export interface IGenre extends Document {
  name: string;
}

export interface IGenreModel extends Model<IGenre> {
  getGenreCount(filter?: FilterQuery<IGenre>): Promise<number>;
  getGenreIdByName(name: string): Promise<mongoose.Types.ObjectId | null>;
}

var GenreSchema: Schema<IGenre> = new Schema(
  {
    name: {type: String, required: true, maxLength: 100, minLength: 4}
  }
);

GenreSchema.statics.getGenreCount = async function (filter? : FilterQuery<IGenre>): Promise<number> {
  return this.countDocuments(filter|| {});
}

GenreSchema.statics.getGenreIdByName = async function (name: string): Promise<mongoose.Types.ObjectId | null> {
  const genre = await this.findOne({ name });
  if (!genre) {
    return null;
  }
  return genre._id;
}

// Export the model
const Genre = mongoose.model<IGenre, IGenreModel>('Genre', GenreSchema);
export default Genre;
