import connectDB from "@/database"
import Blog from "@/models/blog";
import { NextResponse } from "next/server"

export async function DELETE(req){
    try {
        await connectDB();
        const {searchParams}=new URL(req.url);
        const getcurrentblogID=searchParams.get('id');
        if(!getcurrentblogID){
            return NextResponse.json({
                success:false,
                message:"blog id is required"
            })
        }
        else{
            const blog=await Blog.findByIdAndDelete(getcurrentblogID);
            if(blog){
                return NextResponse.json({
                    success:true,
                    message:"deleted successfully"
                })
            }
            else{
                return NextResponse.json({
                    success:false,
                    message:"try again"
                })
            }
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Failed to delete"
        })
    }
}