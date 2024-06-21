"use client"
import { useEffect, useState } from "react"
import AddNewBlog from "../add-new-blog"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,

} from "@/components/ui/card"
import { useRouter } from "next/navigation"


const initialBlogFormData = {
    title: "",
    description: ""

};

const BlogOverview = ({ blogList }) => {
    useEffect(() => {
        try {

        } catch (error) {
            console.log(error)
        }
    }, [])

    const [OpenBlog, setOpenBlog] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [blogFormData, setblogFormData] = useState(initialBlogFormData)
    const [currentEditedblogid, setcurrentEditedblogid] = useState(null)
    const router = useRouter();
    useEffect(() => {
        router.refresh()
    }, [])


    //add new blog
    async function handleSaveBlogData() {
        try {
            setLoading(true)
            const apiResponse =
                currentEditedblogid == null ?
                    awaitfetch('/api/add-blog', {
                        method: "POST",
                        body: JSON.stringify(blogFormData)
                    })
                    : await fetch(`/api/update-blog?id=${currentEditedblogid}`,
                         { method: "PUT", body: JSON.stringify(blogFormData) 

                    })


            const result = await apiResponse.json()
            console.log(result)
            if (result.success) {
                setblogFormData(initialBlogFormData)
                setOpenBlog(false)
                setLoading(false)
                setcurrentEditedblogid(null)
                router.refresh()

            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setblogFormData(initialBlogFormData)
        }
    }


    //delete blog
    async function handleDeleteBlog(id) {
        try {
            const apiResponse = await fetch(`/api/delete-blog?id=${id}`, { method: 'DELETE' })
            const result = await apiResponse.json();
            if (result.success) {
                router.refresh()
            }
        } catch (error) {
            console.log(error)
        }
    }


    //edit blog
    async function handleEditBlog(blog) {
        setcurrentEditedblogid(blog._id)
        console.log("id", currentEditedblogid)
        setblogFormData({ title: blog.title, description: blog.description })
        setOpenBlog(true)

    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-600 p-6">
            <AddNewBlog setcurrentEditedblogid={setcurrentEditedblogid} currentEditedblogid={currentEditedblogid} OpenBlog={OpenBlog} handleSaveBlogData={handleSaveBlogData} setOpenBlog={setOpenBlog} Loading={Loading} setLoading={setLoading} setblogFormData={setblogFormData} blogFormData={blogFormData} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {
                    blogList && blogList.length > 0 ?
                        blogList.map((blog, index) => (
                            <Card className="p-5">
                                <CardContent className="mb-5">
                                    {blog.title}
                                </CardContent>
                                <CardDescription className="">{blog.description}</CardDescription>
                                <div className="mt-5 flex gap-5 ">
                                    <Button onClick={() => handleEditBlog(blog)}>Edit</Button>
                                    <Button onClick={() => handleDeleteBlog(blog._id)}>Delete</Button>
                                </div>
                            </Card>

                        ))

                        : <h3>No Blog Present</h3>
                }
            </div>
        </div>
    )
}

export default BlogOverview
