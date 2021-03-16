import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newQuery, setNewQuery] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNumberAdd = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleNameAdd = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleQuery = (event) => {
    console.log(event.target.value)
    setNewQuery(event.target.value)
    if (filterPersons(persons, newQuery)) {
      setShowAll(false)
    }
  }

  const removePerson = parts => (event) => {
    if (window.confirm(`Are you sure you want to delete ${parts.name}?`)) {
      personService
        .remove(parts.id)
        .then(initialPersons => {
          setPersons(persons => persons.filter(person => person.name !== parts.name))
          setSuccessMessage(
            `Removed ${parts.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(person => person.name.includes(newName))) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const numberPerson = persons.find(person => person.name === newName)
        const changedNumber = { ...numberPerson, number: newNumber }
        personService
          .update(changedNumber)
          .then(response => {
            setPersons(persons => persons.map(person => person.name !== newName ? person : response))
            setSuccessMessage(
              `Updated ${newName}`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  function filterPersons(arr, query) {
    return arr.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }

  const personsToShow = showAll
    ? persons
    : filterPersons(persons, newQuery)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} boolean={false}/>
      <Notification message={successMessage} boolean={true}/>
      <QueryForm newQuery={newQuery} handleQuery={handleQuery} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameAdd={handleNameAdd} newNumber={newNumber} handleNumberAdd={handleNumberAdd} />
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person key={person.id} parts={person} removePerson={removePerson} />
      )}
    </div>
  )
}

const Notification = ({ message, boolean }) => {
  if (message === null) {
    return null
  }
  if (boolean) {
    return (
      <div className="success">
        {message}
      </div>
    )
  } else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

}

const PersonForm = ({ addName, newName, handleNameAdd, newNumber, handleNumberAdd }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameAdd}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberAdd}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const QueryForm = ({ newQuery, handleQuery }) => {
  return (
    <form>
      <div>
        filter to show <input
          value={newQuery}
          onChange={handleQuery}
        />
      </div>
    </form>
  )
}

const Person = ({ parts, removePerson }) => {
  return (
    <p>
      {parts.name} {parts.number} <button onClick={removePerson(parts)}>delete</button>
    </p>
  )
}

export default App