import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <div>
            <h1>
                {props.name}
            </h1>
        </div>
    )
}

const Content = (props) => {
    const contents = props.parts.map(part =>
        <Part key={part.id} parts={part} />
    )
    return (
        <div>
            {contents}
        </div>
    )
}

const Total = (props) => {
    let initialValue = 0
    let total = props.parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises, initialValue
    )
    return (
        <div>
            <p>
                <b>
                    Number of exercises {total}
                </b>
            </p>
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.parts.name} {props.parts.exercises}
        </p>
    )
}

export default Course