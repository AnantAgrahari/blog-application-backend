import blogModel from "../models/blogmodels.js"

class blogController{
    static getAllBlogs= async(req,res)=>{
    try {
        const fetchAllBlogs=await blogModel.find({user: req.user._id});
        return res.status(200).json(fetchAllBlogs);  
    } catch (error) {
        return res.status(400).json({message:error.message});
    }    
    };



    static addNewBlogs=async(req,res)=>{
       const{title,category,description}=req.body;
       try {
        if(title && category && description)
        {
        const addBlog=new blogModel({
        title:title,
        description:description, 
        category:category,
       thumbnail: req.file.filename,
        user: req.user._id,
        });
        const savedBlog=await addBlog.save();
        if(savedBlog)
        {
            return res.status(200).json({message:"blog added successfully"});
        }
        }
        else{
            return res.status(400).json({message:"all fields are required"});
        }
       } catch (err) {
        return res.status(400).json({message:err.message});
       }
    };


    static getSingleBlog=async(req,res)=>{
       const {id}=req.params;
       try {
        if (id){
  const fetchBlogsById=await blogModel.findById(id);
  return res.status(200).json(fetchBlogsById);
        }else{
            return res.status(400).json({message:"invalid url"});
        }
        
       } catch (error) {
        return res.status(400).json({message:error.message});
       }
    };
        
}
export default blogController;