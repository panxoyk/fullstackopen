import React, { useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },		
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filter, setFilter ] = useState('')

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
