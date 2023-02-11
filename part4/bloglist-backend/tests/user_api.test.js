const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('../utils/list_helper')

beforeEach(async () => {
    await User.deleteMany({ })

    const passwordHash = await bcrypt.hash('root1', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

describe('when there is initially one user in db', () => {

    test('no username', async () => {
        const usersAtStart = await helper.usersInDb()

        await api.post('/api/users')
            .send({ password: 'fran1' })
            .expect(400)
        
            const usersAtEnd = await helper.usersInDb()

            expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('no password', async () => {
        const usersAtStart = await helper.usersInDb()

        await api.post('/api/users')
            .send({ username: 'fran' })
            .expect(400)
        
            const usersAtEnd = await helper.usersInDb()

            expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password too short fails', async () => {
        const usersAtStart = await helper.usersInDb()

        await api.post('/api/users')
            .send({ username: 'panchito2', password: 'fr' })
            .expect(400)
        
            const usersAtEnd = await helper.usersInDb()

            expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('username too short fails', async () => {
        const usersAtStart = await helper.usersInDb()

        await api.post('/api/users')
            .send({ username: 'pa', password: 'fran1' })
            .expect(400)
        
            const usersAtEnd = await helper.usersInDb()

            expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('username in use', async () => {
        const usersAtStart = await helper.usersInDb()

        await api.post('/api/users')
            .send({ username: 'root', password: 'fran1' })
            .expect(400)
        
            const usersAtEnd = await helper.usersInDb()

            expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'panchito',
            name: 'Francisco Castillo',
            password: 'fran1',
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})