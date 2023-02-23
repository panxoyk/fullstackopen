import { useQuery, useMutation, useQueryClient } from 'react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
	const queryClient = useQueryClient()

	const updatedAnecdoteMutation = useMutation(updateAnecdote, {
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
		},
	})

	const result = useQuery('anecdotes', getAnecdotes, {
		refetchOnWindowFocus: false,
		retry: 1,
	})

	if (!result.isSuccess) {
		return <div> anecdote service not avaliable due to problems in server </div>
	}

	console.log(result)

	const anecdotes = result.data

	const handleVote = (anecdote) => {
    	updatedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  	}

  	return (
    	<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map(
				(anecdote) =>
				<div key={anecdote.id}>
					<div> {anecdote.content} </div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			)}
    	</div>
  	)
}

export default App
