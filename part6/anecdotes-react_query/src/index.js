import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import { NotifyContextProvider } from './NotifyContext'

const queryClient = new QueryClient()




createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<NotifyContextProvider>
			<App />
		</NotifyContextProvider>
	</QueryClientProvider>
)