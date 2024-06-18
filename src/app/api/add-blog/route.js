import connectDB from "@/database"
import Blog from "@/models/blog"
import Joi from "joi"
import { NextResponse } from "next/server"
 const AddNewBlog =Joi.object({
    title:Joi.string().required(),
    description: Joi.string().required()
 })
export async function POST(req){
    try {
        await connectDB()
        const extractdata= await req.json();
        const {title,description}= extractdata;
        const {error} =AddNewBlog.validate({title, description});
        if(error){
            return NextResponse.json({message:"Invalid data",error:error.details})
            }
        const newlyCreatedBlogITem= await Blog.create(extractdata)
        if(newlyCreatedBlogITem){
         return NextResponse.json({
            success:true,
            message:"blog added successfully"
        })   
        }
        else{
          return NextResponse.json({
            success:false,
            message:"data not added"
        })  
        }
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"something went wrong"
        })
    }
}