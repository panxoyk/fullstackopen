import { useDispatch, useSelector } from 'react-redux'

import { vote } from '../reducers/anecdoteReducer'
import { successNotify, nullNotify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    console.log(useSelector(state => state))

    const initialState = useSelector(
        ({ anecdotes, filter }) => anecdotes.filter(
            (anecdote) => anecdote.content.includes(filter)
        )
    )
    const anecdotes = initialState.sort((a, b) => a.votes - b.votes).reverse()

    const voteAnecdote = (id) => {
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(vote(id))
        dispatch(successNotify(`you voted ${anecdote.content}`))
        setTimeout(() => {
            dispatch(nullNotify())
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div> {anecdote.content} </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAnecdote(anecdote.id)}> vote </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList