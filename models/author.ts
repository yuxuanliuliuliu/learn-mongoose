import mongoose, { Schema, Document, Model, FilterQuery } from 'mongoose';

// Define an interface for the Author document
export interface IAuthor extends Document {
  first_name: string;
  family_name: string;
  date_of_birth?: Date;
  date_of_death?: Date;
  name: string;
  lifespan: string;
}

interface IAuthorModel extends Model<IAuthor> {
  getAuthorCount(filter?: FilterQuery<IAuthor>): Promise<number>;
  getAllAuthors(sortOpts?: { [key: string]: 1 | -1 }): Promise<string[]>;
  getAuthorIdByName(family_name: string, first_name: string): Promise<mongoose.Types.ObjectId | null>; 
}

var AuthorSchema: Schema<IAuthor> = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  let fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
  var lifetime_string = '';
  if (this.date_of_birth) {
    lifetime_string = this.date_of_birth.getFullYear().toString();
  }
  lifetime_string += ' - ';
  if (this.date_of_death) {
    lifetime_string += this.date_of_death.getFullYear().toString();
  }
  return lifetime_string;
});

AuthorSchema.statics.getAuthorCount = async function (filter?: FilterQuery<IAuthor>): Promise<number> {
  return this.countDocuments(filter || {});
}

AuthorSchema.statics.getAllAuthors = async function (sortOpts?: { [key: string]: 1 | -1 }): Promise<string[]> {
  let authorsList: IAuthor[] = [];
  if(sortOpts) {
    authorsList = await Author.find().sort(sortOpts);
  }
  authorsList = await Author.find();
  return authorsList.map(author => `${author.name} : ${author.lifespan}`);
}

AuthorSchema.statics.getAuthorIdByName = async function (family_name: string, first_name: string): Promise<mongoose.Types.ObjectId | null> {
  const author = await this.findOne({ family_name: family_name, first_name: first_name });
  if (!author) {
    return null;
  }
  return author._id;
}

// Export the model
const Author = mongoose.model<IAuthor, IAuthorModel>('Author', AuthorSchema);
export default Author;
