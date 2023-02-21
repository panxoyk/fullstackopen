import { useDispatch, useSelector } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    console.log(useSelector(state => state))

    const initialState = useSelector(
        ({ anecdotes, filter }) => anecdotes.filter(
            (anecdote) => anecdote.content.includes(filter)
        )
    )
    const anecdotes = initialState.sort((a, b) => a.votes - b.votes).reverse()

    const likeAnecdote = (id) => {
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotify(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div> {anecdote.content} </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => likeAnecdote(anecdote.id)}> vote </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList