import { useDispatch, useSelector } from 'react-redux'

import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    console.log(useSelector(state => state))

    const initialState = useSelector(
        ({ anecdotes, filter }) => anecdotes.filter(
            (anecdote) => anecdote.content.includes(filter)
        )
    )
    const anecdotes = initialState.sort((a, b) => a.votes - b.votes).reverse()

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