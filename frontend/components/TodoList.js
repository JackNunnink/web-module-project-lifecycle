import React from 'react'
import Todo from './Todo'

const TodoList = props => {
  return (
    <div>
      <h2>Todos:</h2>
      {props.todos.map(item => {
        <Todo toggleTodo={props.toggleTodo} key={item.id} item={item} />
      })}
    </div>
  )
}

export default TodoList;