import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogIn, username, setUsername, password, setPassword }) => {
    return (
        <div>
            <form onSubmit={handleLogIn} className='loginForm'>
                <div>
                    username <input id='username' type='text' value={username} name='Username' onChange={event => setUsername(event.target.value)} />
                </div>
                <div>
                    password <input id='password' type='password' value={password} name='Password' onChange={event => setPassword(event.target.value)} />
                </div>
                <button id='login-button' type='submit'> Log in </button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleLogIn: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
}

export default LoginForm