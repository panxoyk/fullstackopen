import React, { useState } from 'react'

import blogService from '../services/blogs'

import BlogForm from './BlogForm'

const Bloglist = ({ blogs, setBlogs, setError, setSuccess }) => {
    const [ newBlog, setNewBlog ] = useState({
        title: '',
        author: '',
        url: '',
    })

    const createBlog = async (event) => {
        event.preventDefault()

        const blogObject = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
        }

        try {
            const createdBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(createdBlog))
            setNewBlog({
                title: '',
                author: '',
                url: '',
            })
            setSuccess(`A new blog ${newBlog.title} by ${newBlog.author} added`)
            setTimeout(() => {
                setSuccess(null)
            }, 5000)
        } catch (exception) {
            setError(exception.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 5000)
            setBlogs(blogs.filter(blog => blog !== newBlog))
        }
    }

    return (
        <div>
            <BlogForm createBlog={createBlog} newBlog={newBlog} setNewBlog={setNewBlog} />
            {
                blogs.map(blog =>
                    <div key={blog.id}> <strong> {blog.title} </strong> {blog.author} </div>    
                )
            }
        </div>
    )
}

export default Bloglist