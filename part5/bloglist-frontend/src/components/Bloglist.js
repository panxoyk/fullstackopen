import React, { useState } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

import BlogForm from './BlogForm'
import Blog from './Blog'

const Bloglist = ({ blogs, setBlogs, setError, setSuccess }) => {
    const [ visibility, setVisibility ] = useState(false)

    const createBlog = async (blogObject) => {
        try {
            const createdBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(createdBlog))
            changeVisibility()
            setSuccess(`A new blog ${blogObject.title} by ${blogObject.author} added`)
            setTimeout(() => {
                setSuccess(null)
            }, 5000)
        } catch (exception) {
            setError(exception.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    const likeBlog = async (blogId) => {
        try {
            const blog = blogs.find(blog => blog.id === blogId)
            const blogObject = {
                ...blog,
                likes: blog.likes + 1
            }
            const updatedBlog = await blogService.update(blogId, blogObject)
            setBlogs(blogs.map(blog => blog.id !== blogId ? blog : updatedBlog))
        } catch (exception) {
            setError(exception.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    const deleteBlog = async (blogId) => {
        const blog = blogs.find(blog => blog.id === blogId)
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            try {
                await blogService.remove(blogId)
            } catch (exception) {
                setError(exception.response.data.error)
                setTimeout(() => {
                    setError(null)
                }, 5000)
            }
        }
    }

    const changeVisibility = () => setVisibility(!visibility)

    return (
        <div>
            {
                visibility === false
                    ? <button onClick={changeVisibility}> Create new Blog </button>
                    : <div>
                        <BlogForm addBlog={createBlog} />
                        <button onClick={changeVisibility}> Cancel </button>
                    </div>
            }
            {
                blogs.map((blog) =>
                    <div className='blog' key={blog.id}>
                        <Blog blog={blog} likeBlog={likeBlog} removeBlog={deleteBlog} />
                    </div>
                )
            }
        </div>
    )
}

Bloglist.propTypes = {
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    setSuccess: PropTypes.func.isRequired,
}

export default Bloglist