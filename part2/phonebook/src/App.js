import React, { useState, useEffect } from 'react';

import PersonService from './services/persons';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filter, setFilter ] = useState('')
	const [ alertMessage, setAlertMessage ] = useState(null)
	const [ errorMessage, setErrorMessage ] = useState(null)

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
						setNewNumber('')
						setAlertMessage(`${newName} successfully updated`)
						setTimeout(() => {
							setAlertMessage(null)
						}, 3000)
					})
					.catch(error => {
						setErrorMessage(error.response.data.error)
						setTimeout(() => {
							setErrorMessage(null)
						}, 3000)
					})	
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
					setAlertMessage(`${newName} successfully added to phonebook`)
					setTimeout(() => {
						setAlertMessage(null)
					}, 3000)
				})
				.catch(error => {
					setErrorMessage(error.response.data.error)
					setTimeout(() => {
						setErrorMessage(null)
					}, 3000)
				})	
		}		
	}

	const removePerson = (id) => {
		const person = persons.find(person => person.id === id)
		if (window.confirm(`Remove ${person.name}?`)) {
			PersonService.remove(id)
			PersonService.getAll()
				.then(initialPersons => {
					setPersons(initialPersons)
					setErrorMessage(`${person.name} removed from the phonebook`)
					setTimeout(() => {
						setErrorMessage(null)
					}, 3000)
				})
				.catch(error => {
					setErrorMessage(`${person.name} was already removed from numbers`)
					setTimeout(() => {
						setErrorMessage(null)
					}, 3000)
					setPersons(persons.filter(person => person.id !== id))
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
			<Notification error={errorMessage} alert={alertMessage} />	
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
