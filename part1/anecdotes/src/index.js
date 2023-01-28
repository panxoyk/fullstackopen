import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const Anecdote = ({ anecdote, votes }) => {
    return (
        <div>
            <p> {anecdote} </p>
            <p> has {votes} votes </p>
        </div>
    )
}

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}> {text} </button>
    )
}

const App = ({ anecdotes }) => {
    const [ selected, setSelected ] = useState(0)
    const [ points, setPoints ] = useState(Array(anecdotes.length).fill(0))
    const [ indexMostVoted, setIndexMostVoted ] = useState(0)

    const handleNextAnecdote = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length))
    }

    const mostVotes = Math.max(...points)

    const handleVote = () => {
        const copy = [...points]
        copy[selected] += 1
        setPoints([...copy])
        setIndexMostVoted(() => {
            if (points[selected] >= mostVotes) {
                return selected
            } else {
                return indexMostVoted
            }
        })
    }

    return (
        <div>
            <h1> Anecdote of the day </h1>
            <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
            <Button onClick={handleVote} text='vote' />
            <Button onClick={handleNextAnecdote} text='next anecdote' />
            <h1> Anecdote with most votes </h1>
            <Anecdote anecdote={anecdotes[indexMostVoted]} votes={points[indexMostVoted]} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const root = createRoot(document.getElementById('root'));
root.render(<App anecdotes={anecdotes} />);
