const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Full Stack Open',
        author: 'Francisco Castillo',
        url: 'https://fullstackopen.com',
        likes: 3,
    },
    {
        title: 'Google',
        author: 'Pancho',
        url: 'https://google.com',
        likes: 8
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('unique identifier property is named id,', async () => {
    const response = await api.get('/api/blogs')
    const noteToView = response.body[0]

    expect(noteToView.id).toBeDefined()
    expect(noteToView._id).not.toBeDefined()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a blog can be added', async () => {
    const newBlog = {
        title: 'FIFA',
        author: 'Francisco Castillo',
        url: 'https://www.fifa.com',
        likes: 6,
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const notesAtEnd = await Blog.find({ })
    const contents = notesAtEnd.map(blog => blog.toJSON)

    expect(contents).toHaveLength(initialBlogs.length + 1)
})

test('if the likes property is missing, it will default to the value 0', async () => {
    const newBlog = {
        title: 'YouTube',
        author: 'Panchito',
        url: 'https://youtube.com'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogs = response.body
    const blogAdded = response.body[blogs.length - 1]
    expect(blogAdded.likes).toBe(0)
})

test('if title or url properties are missing, the backend responds with the status code 400', async () => {
    const newBlog1 = {
        author: 'Francisco Castillo',
        url: 'https://facebook.com',
    }

    const newBlog2 = {
        title: 'Twitter',
        author: 'Panxo',
    }

    await api.post('/api/blogs')
        .send(newBlog1)
        .expect(400)

    await api.post('/api/blogs')
        .send(newBlog2)
        .expect(400)
})

afterAll(async () => {
    await mongoose.connection.close()
})