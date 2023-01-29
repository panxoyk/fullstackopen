import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filter, setFilter ] = useState('')

	useEffect(() => {
		const promise = axios.get('http://localhost:3001/persons')
		promise.then(response => {
			setPersons(response.data)
		})
	}, [])

	const personsFiltered = persons.filter(person => person.name.includes(filter))

	const addPerson = (e) => {
		e.preventDefault()
		const exists = persons.filter(person => person.name === newName)

		if (exists.length > 0) {
			alert(`${newName} is already added to phonebook`)
			setNewName('')
		} else {
			const personObject = {
				name: newName,
				number: newNumber
			}
			setPersons(persons.concat(personObject))
			setNewName('')
			setNewNumber('')
		}		
	}

	const handleNewName = (e) => {
		setNewName(e.target.value)
	}

	const handleNewNumber = (e) => {
		setNewNumber(e.target.value)
	}

	const handleFilter = (e) => {
		setFilter(e.target.value)
	}

	return (
		<div>
			<h1> Phonebook </h1>	
			<Filter value={filter} onChange={handleFilter} />
			<h2> Add a new person </h2>
			<PersonForm 
				newName={newName} 
				newNumber={newNumber} 
				handleNewName={handleNewName} 
				handleNewNumber={handleNewNumber} 
				addPerson={addPerson} 
			/>
			<h2> Numbers </h2>
			<Persons persons={personsFiltered} />
		</div>
	)
}

export default App;
