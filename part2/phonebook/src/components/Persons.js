import React from "react";

const Person = ({ person, removePerson }) => {
    return (
        <p> {person.name} {person.number} <button onClick={() => removePerson(person.id)}> delete </button> </p>        
    )
}

const Persons = ({ persons, removePerson }) => {
    return (
        <div>
            {persons.map((person, i) =>
				<Person key={i} person={person} removePerson={removePerson} />	
			)}
        </div>
    )
}

export default Persons;