import React, { useEffect, useState } from 'react'

import loginService from './services/login'
import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import Bloglist from './components/Bloglist'

const App = () => {
    const [ blogs, setBlogs ] = useState([])

    const [ user, setUser ] = useState(null)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ error, setError ] = useState(null)
    const [ success, setSuccess ] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        getAllBlogs()
    }, [])

    const getAllBlogs = async () => {
        const initialBlogs = await blogService.getAll()
        const sortedBlogs = initialBlogs.sort((a, b) => a.likes - b.likes).reverse()
        setBlogs(sortedBlogs)
    }

    const handleLogIn = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setError('wrong username or password')
            setPassword('')
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    const handleLogOut = (event) => {
        event.preventDefault()

        window.localStorage.clear()
        blogService.setToken(null)
        setUser(null)
    }

    return (
        <div>
            {
                user === null
                    ? <h2> Log in to Bloglist App </h2>
                    : <h2> Blogs </h2>
            }
            {error === null ? null : <div className='error alert'> {error} </div>}
            {success === null ? null : <div className='success alert'> {success} </div>}
            {
                user === null
                    ? <LoginForm handleLogIn={handleLogIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
                    : <div>
                        <p> {user.name} logged in <button onClick={handleLogOut}> Log out </button> </p>
                        <Bloglist blogs={blogs} getAllBlogs={getAllBlogs} setError={setError} setSuccess={setSuccess} />
                    </div>

            }
        </div>
    )
}

export default App