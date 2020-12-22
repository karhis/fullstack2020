import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const avg = 1 - (props.good - props.bad) / all
  const positive = props.good / all * 100

  if (all === 0) {
    return (
    <p>No feedback given</p>
    )
  }
  else {
    return (
      <div>
        <table>
          <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      </div>
    )
  }
}

const StatisticLine = (props) => {
  const number = Math.round(props.value * 10) / 10
  if (props.text === 'positive') {
    return (
      <tr>
      <td>{props.text}</td>
      <td>{number} %</td>
      </tr>

    )
  }
  return (
    <tr>
    <td>{props.text}</td>
    <td>{number}</td>
    </tr>

  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)




  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


const Header = ({text}) => {
  return (
    <h1>
      {text}
    </h1>
  )
}

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)