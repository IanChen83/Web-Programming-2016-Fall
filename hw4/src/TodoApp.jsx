/* eslint-disable react/no-multi-comp */
import React from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './TodoItem';

// To Fit HW requirement @@
// This actually elevate component dependencies...
class CountDisplay extends React.Component {
    renderDoneNumber() {
        return this.props.items.reduce((prev, curr) => ((curr.isDone) ? prev + 1 : prev), 0);
    }

    renderUndoneNumber() {
        return this.props.items.length - this.renderDoneNumber();
    }
    render() {
        return(
            <div className="row">
                <div className="eight wide column">
                    <div className="ui two small statistics">
                        <div className="ui orange statistic">
                            <div className="value">
                                <i className="calendar outline icon" />
                                <span id="undoneNum">
                                    {this.renderUndoneNumber()}
                                </span>
                            </div>
                            <div className="label">to be done</div>
                        </div>
                        <div className="ui green statistic" style={{ marginBottom: 0 }}>
                            <div className="value">
                                <i className="checked calendar icon" />
                                <span id="doneNum">
                                    {this.renderDoneNumber()}
                                </span>
                            </div>
                            <div className="label">Have done</div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}


CountDisplay.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.object),
};

CountDisplay.defaultProps = {
    items: [],
};


class TodoApp extends React.Component {
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

ReactDOM.render(<TodoApp / >,
    document.getElementById('root')
);
