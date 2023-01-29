import React from 'react';

const Header = ({ course }) => <h2> {course} </h2>

const Content = ({ parts }) => <div> {parts.map((part, i) => <Part key={i} part={part} />)} </div>

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

const Total = ({ course }) => {
    let sum = 0
    course.parts.map(part => sum += part.exercises)

    return (
        <strong> total of {sum} exercises </strong>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />            
            <Content parts={course.parts} />
            <Total course={course} />
        </div>
    )
} 

export default Course;