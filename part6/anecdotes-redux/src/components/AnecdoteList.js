import { useDispatch, useSelector } from 'react-redux'

import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const initialState = useSelector(state => state)
    const anecdotes = initialState.sort((a, b) => a.votes - b.votes).reverse()

    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div> {anecdote.content} </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => dispatch(vote(anecdote.id))}> vote </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList