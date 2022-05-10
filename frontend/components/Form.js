import React from 'react'

export default class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      itemText: ''
    }
  }

  handleChanges = evt => {
    this.setState({
      itemText: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.props.addItem(evt, this.state.itemText)
    this.setState({
      itemText: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type='text'
          name='item'
          value={this.state.itemText}
          onChange={this.handleChanges}
        />
        <button>submit</button>
      </form>
    )
  }
}
