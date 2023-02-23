import { useMutation, useQueryClient } from 'react-query'

import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
	const queryClient = useQueryClient()

	const createdAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: (createdAnecdote) => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.concat(createdAnecdote))
		},
	})

  	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		if (content.length < 5) {
			createdAnecdoteMutation.mutate({ content, votes: 0 })
		}
		event.target.anecdote.value = ''
	}

  	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type="submit">create</button>
			</form>
		</div>
  	)
}

export default AnecdoteForm
