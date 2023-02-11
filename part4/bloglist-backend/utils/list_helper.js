const _ = require('lodash')
const User = require('../models/user')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, curr) => sum + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
    let count = 0
    blogs.map(blog => {
        if (blog.likes > count) {
            count = blog.likes
        }
    })
    const favoriteBlog = blogs.find(blog => blog.likes === count)

    return blogs.length === 0
        ? null
        : favoriteBlog
}

const mostBlogs = (blogs) => {
    const authorWithBlogNumber = _.countBy(blogs, 'author')
    const maxValue = Math.max(...Object.values(authorWithBlogNumber))
    const maxIndex = Object.keys(authorWithBlogNumber).find(key => authorWithBlogNumber[key] === maxValue)

    return blogs.length === 0
        ? null
        : { author: maxIndex, blogs: maxValue }
}

const mostLikes = (blogs) => {
    let authorWithMostLikes = {}
    
    blogs.forEach(blog => {
        if (blog.author in authorWithMostLikes) {
            authorWithMostLikes[blog.author] += blog.likes
        } else {
            authorWithMostLikes[blog.author] = blog.likes
        }
    })

    const maxValue = Math.max(...Object.values(authorWithMostLikes))
    const maxIndex = Object.keys(authorWithMostLikes).find(key => authorWithMostLikes[key] === maxValue)

    return blogs.length === 0
        ? null
        : { author: maxIndex, likes: maxValue }
}

const usersInDb = async () => {
    const users = await User.find({ })

    return users.map(user => user.toJSON())
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, usersInDb }