import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog }) => {
    const [ visible, setVisible ] = useState(false)

    const user = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div>
                {blog.title} {blog.author} <button onClick={toggleVisibility}> {visible === true ? 'Hide' : 'View'} </button>
                {
                    visible === true
                        ? <div>
                            <a href={blog.url}> {blog.url} </a>
                            <div className='likes'> likes {blog.likes} <button onClick={() => likeBlog(blog.id)}> Like </button> </div>
                            <div> {blog.user.name} </div>
                            {
                                user.username === blog.user.username
                                    ? <button onClick={() => removeBlog(blog.id)}> Remove </button>
                                    : null
                            }
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func,
    removeBlog: PropTypes.func,
}

export default Blog