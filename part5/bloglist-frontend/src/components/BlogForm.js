import React, { useState } from "react";

const BlogForm = ({ addBlog }) => {    
    const [ newBlog, setNewBlog ] = useState({
        title: '',
        author: '',
        url: '',
    })

    const createBlog = (event) => {
        event.preventDefault()

        const blogObject = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
        }

        addBlog(blogObject)
        
        setNewBlog({
            title: '',
            author: '',
            url: '',
        })
    }

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