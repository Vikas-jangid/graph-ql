import mongoose from "mongoose";
const schema = mongoose.Schema;

const authorSchema = new schema({
    name: String,
    age: Number
});

export default new mongoose.model("Author", authorSchema);
