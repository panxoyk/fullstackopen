import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { NotifyContextProvider } from './NotifyContext'

import App from './App'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<NotifyContextProvider>
			<App />
		</NotifyContextProvider>
	</QueryClientProvider>
)