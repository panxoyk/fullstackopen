import React, { useState, useEffect } from 'react';

import PersonService from './services/persons';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filter, setFilter ] = useState('')

	useEffect(() => {
		PersonService.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

	const personsFiltered = persons.filter(person => person.name.includes(filter))

	const addPerson = (e) => {
		e.preventDefault()
		const person = persons.find(person => person.name === newName)

		if (person) {
			if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
				const changedPerson = { ...person, number: newNumber }

				PersonService.update(person.id, changedPerson)
					.then(returnedPerson => {
						setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
					})
				
				setNewNumber('')
			}
			setNewName('')
		} else {
			const personObject = {
				name: newName,
				number: newNumber
			}
			PersonService.create(personObject)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
				})		
		}		
	}

	const removePerson = (id) => {
		const person = persons.find(person => person.id === id)
		if (window.confirm(`Delete ${person.name}?`)) {
			PersonService.remove(id)
			PersonService.getAll()
				.then(initialPersons => {
					setPersons(initialPersons)
				})
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
			<Persons persons={personsFiltered} removePerson={removePerson} />
		</div>
	)
}

export default App;
