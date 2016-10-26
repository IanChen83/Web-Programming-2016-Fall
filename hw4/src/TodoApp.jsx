/* eslint-disable react/no-multi-comp */
import React from 'react';
import TodoItem from './TodoItem';
import CountDisplay from './CountDisplay';

export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            inputValue: '',
        };

        this.renderTodoItems = this.renderTodoItems.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.toggleDoneItem = this.toggleDoneItem.bind(this);
        this.onInputKeyPress = this.onInputKeyPress.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    onInputKeyPress(e) {
        if(e.key === 'Enter') {
            if(this.state.inputValue !== '') {
                this.addItem(this.state.inputValue);
                this.setState({ inputValue: '' });
            }
        } else {
            this.setState({ inputValue: e.target.value + e.key });
        }
    }

    onAddButtonClick() {
        if(this.state.inputValue) {
            this.addItem(this.state.inputValue);
            this.setState({ inputValue: '' });
        }
    }

    addItem(text) {
        this.setState({ items: [...this.state.items, { content: text, isDone: false }] });
    }

    removeItem(idx) {
        this.setState({
            items: this.state.items.filter((v, i) => i !== idx),
        });
    }

    toggleDoneItem(idx) {
        const newItems = [...this.state.items];
        newItems[idx].isDone = !newItems[idx].isDone;
        this.setState({ items: newItems });
    }

    renderTodoItems() {
        if(this.state.length === 0) {
            return '';
        }

        return this.state.items.map(
            (v, i) => <TodoItem
              key={i}
              idx={i}
              content={v.content}
              isDone={v.isDone}
              doneClick={this.toggleDoneItem}
              removeClick={this.removeItem}
            />
        );
    }

    render() {
        return(
            <div
              className="ui one column centered vertically divided grid container"
              style={{ marginTop: '30px' }}
            >
                <div className="row">
                    <div className="eight wide column">
                        <div className="ui fluid action huge input">
                            <input
                              type="text"
                              placeholder="Add new todo here..."
                              value={this.state.inputValue}
                              onKeyPress={this.onInputKeyPress}
                            />
                            <button
                              id="addBtn"
                              className="ui icon button"
                              onClick={this.onAddButtonClick}
                            >
                                <i className="plus icon" />
                            </button>
                        </div>
                    </div>
                </div>
                <CountDisplay items={this.state.items} />
                <div className="row">
                    <div className="eight wide column">
                        <div className="ui massive divided list">
                            { this.renderTodoItems() }
                        </div>
                    </div>
                </div>
            </div>);
    }
}

