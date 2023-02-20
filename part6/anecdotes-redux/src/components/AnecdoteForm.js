import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { successNotify, nullNotify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(create(content))
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