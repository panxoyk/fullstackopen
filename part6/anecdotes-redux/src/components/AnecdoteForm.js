import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(create(content))
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2> Create new </h2>
            <form onSubmit={addAnecdote}>
                <input name='anecdote' />
                <button type='submit'> create </button>
            </form>
        </div>
    )
}

export default AnecdoteForm