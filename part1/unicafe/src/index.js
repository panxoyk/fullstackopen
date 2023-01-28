import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}> {text} </button>
}

const Statistic = ({ text, value }) => {
	return (
		<p> {text}: {value} </p>
	)
}

const Statistics = ({ good, neutral, bad, avgRate }) => {
	const all = good + neutral + bad
	const positive = good / (good + neutral + bad)

	if ((all) === 0) {
		return (
			<div>
				<p> No feedback given </p>
			</div>			
		)
	} 

	return (
		<div>
			<Statistic text='good' value={good} />
			<Statistic text='neutral' value={neutral} />
			<Statistic text='bad' value={bad} />
			<Statistic text='all' value={all} />
			<Statistic text='average' value={avgRate} />
			<p> positive: {positive}% </p>
		</div>
	)
}

const App = () => {
	const [ good, setGood ] = useState(0)
	const [ neutral, setNeutral ] = useState(0)
	const [ bad, setBad ] = useState(0)
	const [ rates, setRates ] = useState([])

	const handleGood = () => {
		setGood(good + 1)
		setRates(rates.concat(1))
	}

	const handleNeutral = () => {
		setNeutral(neutral + 1)
		setRates(rates.concat(0))
	}

	const handleBad = () => {
		setBad(bad + 1)
		setRates(rates.concat(-1))
	}

	const avgRate = (rates) => {
		let total = 0
		for (let i = 0; i < rates.length; i++) {
			total += rates[i]
		}
		const average = total / rates.length
		return average
	}

	return (
		<div>
			<h1> Give Feedback </h1>
			<div>
				<Button onClick={handleGood} text='Good' />
				<Button onClick={handleNeutral} text='Neutral' />
				<Button onClick={handleBad} text='Bad' />
			</div>			
			<h1> Statistics </h1>
			<Statistics good={good} neutral={neutral} bad={bad} avgRate={avgRate(rates)} />
		</div>		
	)
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
