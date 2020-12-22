import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
        <Part parts={props.parts[0]} />
        <Part parts={props.parts[1]} />
        <Part parts={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  var sum = 0
  props.parts.forEach(value => {
    sum = sum + value.exercises
  })
  return (
    <div>
      <p>
        Number of exercises {sum}
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

ReactDOM.render(<App />, document.getElementById('root'))