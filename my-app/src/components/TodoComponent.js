import React from 'react';
import PropTypes from 'prop-types';

class Todo extends React.Component {
    constructor() {
        super()
    }

    static propTypes = {
        checked: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired
    }

    render() {
        return (
            <li>
                <input
                    type="checkbox"
                    checked={this.props.todo.checked}
                    onChange={this.props.onToggle} />
                <button onClick={this.props.onDelete}>delete</button>
                <span>{this.props.todo.text}</span>
            </li>
        )
    }
}

export default Todo;
