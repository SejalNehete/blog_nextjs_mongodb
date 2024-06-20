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

function AddNewBlog({ OpenBlog, setOpenBlog, blogFormData, Loading, setLoading, handleSaveBlogData, setblogFormData }) {
    return (
        <div className=" bg-gradient-to-r from-purple-700 to-blue-600 p-6">
            <div>
                <Button onClick={() => setOpenBlog(true)} >Add new Blog</Button>

            </div>
            <Dialog open={OpenBlog} onOpenChange={() => {
                setOpenBlog(false);
                setblogFormData({
                    title: "",
                    description: ""
                })
            }}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Blog</DialogTitle>

                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                name="title"
                                id="title"
                                className="col-span-3"
                                value={blogFormData.title}
                                onChange={(e) => setblogFormData((prev) => ({ ...prev, title: e.target.value }))}

                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                className="col-span-3"
                                name="description"
                                value={blogFormData.description}
                                onChange={(e) => setblogFormData((prev) => ({ ...prev, description: e.target.value }))}

                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveBlogData} type="button">   
                         {Loading ? "saving changes" : "save changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewBlog
