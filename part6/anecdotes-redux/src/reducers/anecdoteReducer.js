import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        set(state, action) {
            state = action.payload
            return state
        },
        create(state, action) {
            const newAnecdote = action.payload
            state.push(newAnecdote)
        },
        vote(state, action) {
            const id = action.payload
            const anecdoteToVote = state.find(anecdote => anecdote.id === id)
            const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

            return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
        }
    }
})

export const { set, create, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer