import React from 'react'
import AgendaItem from './AgendaItem'

export default function TodoList({todos}) {
  return (
    todos.map(todo =>{
      return <Todo key = {todo} todo={todo} />
    })
  )
}
