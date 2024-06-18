"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import AddNewBlog from "../add-new-blog"
const initialBlogFormData = {
    title: "",
    description: ""

};

const BlogOverview = () => {
    const [OpenBlog, setOpenBlog] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [blogFormData, setblogFormData] = useState(initialBlogFormData)
    console.log(blogFormData)
    async function handleSaveBlogData() {
        try {
            const apiResponse = await fetch('/api/add-blog', {
                method: "POST",
                body: JSON.stringify(blogFormData)
            })
            const result = await apiResponse.json()
            console.log(result)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setblogFormData(initialBlogFormData)
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-600 p-6">
            <AddNewBlog OpenBlog={OpenBlog} handleSaveBlogData={handleSaveBlogData} setOpenBlog={setOpenBlog} Loading={Loading} setLoading={setLoading} setblogFormData={setblogFormData} blogFormData={blogFormData} />

        </div>
    )
}

export default BlogOverview
