import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    image:String
})
const BlogModel = mongoose.model("blog",BlogSchema);
export default BlogModel;