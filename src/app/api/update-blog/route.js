import connectDB from "@/database"
import Blog from "@/models/blog"
import Joi from "joi"
import { NextResponse } from "next/server"
const EditBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

export async function PUT(req) {
    try {

        await connectDB()
        const { searchParams } = new URL(req.url);
        console.log(searchParams)
        const id = searchParams.get('id');
        if(!id){
            return NextResponse.json({
                success:false,
                message:"blog id is not presenr"
            })
        }
        const { title, description } = await req.json()
        const { error } = EditBlog.validate({ title, description });
        if (error) {
            return NextResponse.json({ message: "Invalid data", error: error.details })
        }
        const updateblog= await Blog.findByIdAndUpdate({
            _id:id
        },{title,description},{new : true})
        if(updateblog){
            return NextResponse.json({
                success: true,
                message: "blog update successfully"
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "somenthing went wrong"
        })
    }
}