import BlogOverview from '../components/blog-overview'
async function fetchlistofBlog() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blog",
      {
        method: 'GET',
        cache: 'no-store'
      });
      
    const result = await apiResponse.json()
    console.log(result)
    return result.data
  } catch (error) {
    console.log(error)
  }
}
async function Blogs() {
  const blogList = await fetchlistofBlog()
  console.log(blogList)
  return (
    <BlogOverview blogList={blogList} />
  )
}

export default Blogs
