import React from "react";

const BlogForm = ({ createBlog, newBlog, setNewBlog }) => {
    const handleTitle = (event) => {
        setNewBlog({ ...newBlog, title: event.target.value })
    }
    
    const handleAuthor = (event) => {
        setNewBlog({ ...newBlog, author: event.target.value })
    }    
    
    const handleUrl = (event) => {
        setNewBlog({ ...newBlog, url: event.target.value })
    }    

    return (
        <div>
            <h3> Create new Blog </h3>
            <form onSubmit={createBlog}>
                <div>
                    title <input type='text' value={newBlog.title} onChange={handleTitle} />
                </div>
                <div>
                    author <input type='text' value={newBlog.author} onChange={handleAuthor} />
                </div>
                <div>
                    url <input type='text' value={newBlog.url} onChange={handleUrl} />
                </div>
                <button type="submit"> Create </button>
            </form>
        </div>
    )
}

export default BlogForm