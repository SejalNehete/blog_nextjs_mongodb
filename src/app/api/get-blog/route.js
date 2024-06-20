import connectDB from "@/database"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"

export async function GET(){
    try {
        connectDB()
        const getdata=await Blog.find({});
        if(getdata){
            return NextResponse.json({
                success:true,
                data:getdata
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"something wrong"
            })
        }
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"something wrong"
        })
    }
}