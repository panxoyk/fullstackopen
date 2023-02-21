import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(createAnecdote(content))
        dispatch(setNotify(`Added '${content}'`, 5))
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2> New Anecdote </h2>
            <form onSubmit={addAnecdote}>
                <input name='anecdote' />
                <button type='submit'> create </button>
            </form>
        </div>
    )
}

export default AnecdoteForm