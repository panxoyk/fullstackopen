import React from 'react'
import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'

import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {
    return (
        <div>
            <h1> Unicafe Stats </h1>
            <div>
                <button onClick={() => store.dispatch({ type: 'GOOD' })}> good </button>
                <button onClick={() => store.dispatch({ type: 'OK' })}> ok </button>
                <button onClick={() => store.dispatch({ type: 'BAD' })}> bad </button>
                <button onClick={() => store.dispatch({ type: 'ZERO' })}> reset </button>
            </div>
            <div> good {store.getState().good} </div>
            <div> ok {store.getState().ok} </div>
            <div> bad {store.getState().bad} </div>
        </div>
    )
}

const renderApp = () => {
	const root = createRoot(document.getElementById('root'))
	root.render(
		<App />
	)
}

renderApp()
store.subscribe(renderApp)