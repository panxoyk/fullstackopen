import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

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
            const votedAnecdote = action.payload
            return state.map(anecdote => anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote)
        }
    }
})

export const { set, create, vote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(set(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.create(content)
        dispatch(create(newAnecdote))
    }
}

export const voteAnecdote = (anecdote) => {
    return async (dispatch) => {
        const votedAnecdote = await anecdoteService.vote(anecdote)
        dispatch(vote(votedAnecdote))
    }
}

export default anecdoteSlice.reducer