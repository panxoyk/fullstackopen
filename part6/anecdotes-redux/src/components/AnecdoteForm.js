import { useDispatch } from 'react-redux'

import anecdoteService from '../services/anecdotes'
import { create } from '../reducers/anecdoteReducer'
import { successNotify, nullNotify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        const newAnecdote = await anecdoteService.create(content)
        dispatch(create(newAnecdote))
        dispatch(successNotify(`Added ${content}`))
        event.target.anecdote.value = ''
        setTimeout(() => {
            dispatch(nullNotify())
        }, 5000)
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