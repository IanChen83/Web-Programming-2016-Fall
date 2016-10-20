import React from 'react';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.removeClick = this.removeClick.bind(this);
        this.doneClick = this.doneClick.bind(this);
    }

    doneClick() {
        this.props.doneClick(this.props.idx);
    }

    removeClick() {
        this.props.removeClick(this.props.idx);
    }

    render() {
        return(<div className="item todoitem">
            <div className="right floated content">
                <button
                  className="red basic circular ui icon button delete"
                  onClick={this.removeClick}
                >
                    <i className="larger remove icon" />
                </button>
                <button
                  className="green basic circular ui icon button markdone"
                  onClick={this.doneClick}
                >
                    <i className="larger checkmark icon" />
                </button>
            </div>
            <span className={`content ${this.props.isDone ? 'doneContent' : ''}`}>{this.props.content}</span>
        </div>);
    }
}

TodoItem.propTypes = {
    content: React.PropTypes.string,
    isDone: React.PropTypes.bool,
    removeClick: React.PropTypes.func,
    doneClick: React.PropTypes.func,
    idx: React.PropTypes.number,
};

TodoItem.defaultProps = {
    content: '',
    isDone: false,
    removeClick: function() {},
    doneClick: function() {},
    idx: -1,
};
