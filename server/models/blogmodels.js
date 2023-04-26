import mongoose from "mongoose";
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    category:{
        type:String,
        refer:"categories"
    },
    description:{
        type:String,
    },
    thumbnail:{
        type:mongoose.Schema.Types.ObjectId,
        refer:"users",
    },
});
const blogModel=mongoose.model("blogs",blogSchema);
export default blogModel;