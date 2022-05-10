import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    completed: false,
    displayCompleteds: true
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
      })
      .catch(err => {
        this.setState({ ...this.setState, error: err.response.data.message })
      })
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  inputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value })
  }

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.fetchAllTodos()
        this.setState({ ...this.state, todoNameInput: '' })
      })
      .catch(err => {
        this.setState({ ...this.setState, error: err.response.data.message })
      })
  }

  formSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
  }

  toggleCompleted = id => evt => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.map(td => {
            if (td.id !== id) return td
            return res.data.data
          })
        })
      })
      .catch(err => {
        this.setState({ ...this.setState, error: err.response.data.message })
      })
  }

  toggleDisplayCompleted = () => {
    this.setState({ ...this.state, displayCompleteds: !this.state.displayCompleteds })
  }

  render() {
    return (
      <div>
        <div id='error'>{this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {
            this.state.todos.reduce((acc, td) => {
              if (this.state.displayCompleteds || !td.completed) return acc.concat(
                <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name} {td.completed ? ' ✓' : ''}</div>
              )
              return acc
            }, [])
          }
        </div>
        <form id='todoForm' onSubmit={this.formSubmit}>
          <input value={this.state.todoNameInput} onChange={this.inputChange} type='text' placeholder='Type todo'></input>
          <input type='submit'></input>
        </form>
        <button onClick={this.toggleDisplayCompleted}>{this.state.displayCompleteds ? 'Hides' : 'Show'}</button>
      </div>
    )
  }
}
