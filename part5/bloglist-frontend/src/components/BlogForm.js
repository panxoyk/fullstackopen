import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
                    title <input id='blog-title' type='text' value={newBlog.title} onChange={handleTitle} />
                </div>
                <div>
                    author <input id='blog-author' type='text' value={newBlog.author} onChange={handleAuthor} />
                </div>
                <div>
                    url <input id='blog-url' type='text' value={newBlog.url} onChange={handleUrl} />
                </div>
                <button id='createBlog-button' type="submit"> Create </button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
}

export default BlogForm