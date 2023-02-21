import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import anecdoteService from './services/anecdotes'
import { set } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        anecdoteService.getAll()
            .then((anecdotes) => {
                dispatch(set(anecdotes))
            })
    }, [dispatch])

    return (
        <div>
            <h1> Anecdotes </h1>
            <Filter />
            <Notification />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App