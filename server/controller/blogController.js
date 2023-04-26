import blogmodels from "../models/blogmodels.js"
class blogController{
    static getAllBlogs= async(req,res)=>{
    try {
        const fetchAllBlogs=await blogmodels.find({user:req.user._id});
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
        const addBlog=new blogmodels({
        title:title,
        description:description,
        category:category,
        
        user:req.user_id,
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
       } catch (error) {
        return res.status(400).json({message:error.message});
       }
    };
    static getSingleBlog=async(req,res)=>{
       const{id}=req.params;
       try {
        if(id){
  const fetchBlogsById=await blogmodels.findById(id);
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