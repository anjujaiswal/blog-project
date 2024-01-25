import BlogModel from "../models/index.js";
import fs from "fs";
export const getBlogById = async(req,res) =>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({
                success: false,
                status_code: 404,
                message: 'Id is missing',
                result: ''
            })
        }
        const blog =  await BlogModel.findById({_id:id});
        if (!blog){
            return res.status(404).json({
                success: true,
                status_code: 404,
                message: 'Blog not found',
                result: ''
            })
        }
        return res.status(200).json({
            success: true,
            status_code: 500,
            message: 'Successfull',
            result: blog
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            status_code: 500,
            message: 'INTERNAL_SERVER_ERROR',
            result: ''
        })
    }
}
export const getAllBlogs = async (req, res)=>{
  try{
      const blogs =  await BlogModel.find({});
      return res.status(200).json({
          success: true,
          status_code: 500,
          message: 'All the blogs',
          result: blogs
      })
  }catch(error){
      return res.status(500).json({
          success: true,
          status_code: 500,
          message: 'INTERNAL_SERVER_ERROR',
          result: ''
      })
  }
}

export const uploadBlog = async (req, res)=>{
    try{
        const {title, description} = req.body;
        // console.log("ll", req.file);
        
        if(!title || !description || !req.file){
            if(req.file){
                
                fs.unlinkSync(`public/images/${req.file.filename}`)
            }
            return res.status(404).json({
                success: false,
                status_code: 400,
                message: 'SOMETHING_WENT_WRONG',
                result: ''
            })
        }
        const image = req.file.filename;
        const blog = {
            title,
            description,
            image
        }
        let data =  new BlogModel(blog);
        // conseole.log("daa")
        await data.save();
        return res.status(201).json({
            success: true,
            status_code: 201,
            message: 'BLOG_POSTED',
            result: data
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            status_code: 500,
            message: 'INTERNAL_SERVER_ERROR',
            result: ''
        })
    }
}
export const updateBlog = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return  res.status(500).json({
                success: false,
                status_code: 404,
                message: 'Id is missing',
                result: ''
            })
        }
        const {title, description} = req.body;
        let image = null;
       if(req.file){
            image = req.file.filename
       }
        const blog =  await BlogModel.findById({_id:id});
        if (!blog){
            return res.status(404).json({
                success: true,
                status_code: 404,
                message: 'Blog not found',
                result: ''
            })
        }
        const data = {
            title: title || blog.title,
            description: description || blog.description,
            image: image || blog.image
        }
        const updatedData = await BlogModel.findByIdAndUpdate({_id:id},data);
        if(blog.image){
            fs.unlinkSync(`public/images/${blog.image}`);
        }
        return res.status(200).json({
            success: true,
            status_code: 200,
            message: 'blog updated Successfully',
        
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            status_code: 500,
            message: 'INTERNAL_SERVER_ERROR',
            result: ''
        })
    }
}

export const deleteBlog = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return  res.status(500).json({
                success: false,
                status_code: 404,
                message: 'Id is missing',
                result: ''
            })
        }
        const blog =  await BlogModel.findByIdAndDelete({_id:id});
        if (!blog){
            return res.status(404).json({
                success: true,
                status_code: 404,
                message: 'Blog not found',
                result: ''
            })
        }
        if(blog.image){
            fs.unlinkSync(`public/images/${blog.image}`);
        }
        return res.status(200).json({
            success: true,
            status_code: 200,
            message: 'blog deleted Successfully',
            result: blog
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            status_code: 500,
            message: 'INTERNAL_SERVER_ERROR',
            result: ''
        })
    }
}