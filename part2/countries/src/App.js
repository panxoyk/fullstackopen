import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
	return (
		<div>
			<h1> {country.name} </h1>
			<div>
				<p> capital: {country.capital} </p>
				<p> population: {country.population} </p>
			</div>			
			<h2> languages </h2>
			<ul>
				{country.languages.map((language, i) => <li key={i}> {language.name} </li>)}
			</ul>
			<img src={country.flags.png}  alt={`${country.name} flag`} />
		</div>
	)
}

const Countries = ({ countries, setCountries }) => {
	return (
		<div>
			{
				countries.length === 1 
				? 
				<Country country={countries[0]} /> 
				: 
				countries.length < 11 
				?
				countries.map(
					(country, i) => 
					<div key={i}> 
						{country.name} <button key={i} onClick={() => setCountries([country])}> show </button> 
					</div>
				) 
				: 
				<strong> Too many matches, specify another filter </strong>
			}
		</div>
	)
}

const Filter = ({ value, onChange }) => {
	return (
		<div>
			<p> find countries <input value={value} onChange={onChange} /> </p>
		</div>
	)
}

const App = () => {
	const [ countries, setCountries ] = useState([])
	const [ filter, setFilter ] = useState('')
	const [ filterCountries, setFilterCountries ] = useState([])

	useEffect(() => {
		const promise = axios.get('https://restcountries.com/v2/all')
		promise.then(response => {
			setCountries(response.data)
		})
	}, [])

	const handleFilter = (e) => {
		setFilter(e.target.value)
		setFilterCountries(countries.filter(country => country.name.startsWith(e.target.value) === true))
	}

	return (
		<div>
			<Filter value={filter} onChange={handleFilter} />
			<Countries countries={filterCountries} setCountries={setFilterCountries} />
		</div>
	)
}

export default App;
