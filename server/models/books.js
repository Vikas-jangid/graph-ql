import mongoose from "mongoose";
const schema = mongoose.Schema;

const bookSchema = new schema({
    name: String,
    genre: String,
    authorId: String
})

export default new mongoose.model("Book", bookSchema);
