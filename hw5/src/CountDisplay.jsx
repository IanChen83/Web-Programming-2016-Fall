import React from 'react';

export default class CountDisplay extends React.Component {
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
