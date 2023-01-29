import React from "react";

const Person = ({ name, number }) => {
    return (
        <p> {name} {number} </p>
    )
}

const Persons = ({ persons }) => {
    return (
        <div>
            {persons.map((person, i) =>
				<Person key={i} name={person.name} number={person.number} />	
			)}
        </div>
    )
}

export default Persons;