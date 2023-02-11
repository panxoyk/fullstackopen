const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({ }).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const { title, url, likes } = request.body
    
    const token = request.token

    const decodenToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodenToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodenToken.id)

    const newBlog = new Blog({
        title,
        author,
        url,
        likes,
        user: user._id,
    })

    const savedBlog = await newBlog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token

    const decodenToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodenToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodenToken.id)

    const DeletePermission = user.blogs.toString().includes(request.params.id)

    if (DeletePermission) {
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    }

    return response.status(400).json({ error: 'not allowed' })    
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id, blog, { new: true, runValidators: true, context: 'query' }
    )

    response.json(updatedBlog)
})

module.exports = blogsRouter