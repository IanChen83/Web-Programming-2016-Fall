/* eslint-disable max-len,class-methods-use-this */
import React from 'react';

import CalcButton from './CalcButton';

const Operator = {
    Plus: 0,
    Minor: 1,
    Multiply: 2,
    Divide: 3,
};

class CalcApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            Op: null,
            prevOp: null,
            numbering: true,
        };

        this.resetState = this.resetState.bind(this);
        this.reverseSign = this.reverseSign.bind(this);
        this.operatorHandler = this.operatorHandler.bind(this);
        this.numberHandler = this.numberHandler.bind(this);
        this.equalHandler = this.equalHandler.bind(this);
    }

    resetState() {
        this.setState({
            value: 0,
            Op: null,
            prevOp: null,
            numbering: true,
        });
    }

    reverseSign() {
        this.setState({ value: -this.state.value });
    }

    operatorHandler(e) {
        const op = e.target.textContent;
        const newState = {...this.state };
        if(op === '+') {
            newState.Op = Operator.Plus;
        } else if(op === '-') {
            newState.Op = Operator.Minor;
        } else if(op === 'x') {
            newState.Op = Operator.Multiply;
        } else if(op === '÷') {
            newState.Op = Operator.Divide;
        }

        newState.numbering = false;
        newState.prevValue = this.state.value;
        newState.prevOp = this.createOp(this.state.value, newState.Op);

        if(this.state.numbering && this.state.prevOp) {
            newState.value = this.state.prevOp(this.state.value);
        }

        this.setState(newState);
    }

    numberHandler(e) {
        const num = (+e.target.textContent);
        const newState = {...this.state };
        if(this.state.numbering) {
            newState.value = (this.state.value * 10) + num;
        } else {
            newState.value = num;
        }
        newState.numbering = true;

        this.setState(newState);
    }

    createOp(value, op) {
        if(op === Operator.Plus) {
            return x => value + x;
        } else if(op === Operator.Minor) {
            return x => value - x;
        } else if(op === Operator.Multiply) {
            return x => value * x;
        } else if(op === Operator.Divide) {
            return x => ((x === 0) ? NaN : value / x);
        }

        return x => x;
    }

    equalHandler() {
        const newState = {...this.state };
        newState.Op = null;
        newState.numbering = false;

        if(this.state.numbering) {
            newState.prevOp = this.createOp(this.state.value, this.state.Op);
        }

        if(this.state.prevOp) {
            newState.value = this.state.prevOp(this.state.value);
        }

        this.setState(newState);
    }

    showNotImplemented() {
        console.warn('This function is not implemented yet.'); /* eslint-disable-line no-console */
    }

    render() {
        console.log(this.state);
        return(
            <div className="calc-app">
                <div className="calc-container">
                    <div className="calc-output">
                        <div className="calc-display">{this.state.value}</div>
                    </div>
                    <div className="calc-row">
                        <CalcButton onClick={this.resetState}>AC</CalcButton>
                        <CalcButton onClick={this.reverseSign}>+/-</CalcButton>
                        <CalcButton onClick={this.showNotImplemented.bind(this)}>%</CalcButton>
                        <CalcButton onClick={this.operatorHandler} className="calc-operator">÷</CalcButton>
                    </div>
                    <div className="calc-row">
                        <CalcButton onClick={this.numberHandler} className="calc-number">7</CalcButton>
                        <CalcButton onClick={this.numberHandler} className="calc-number">8</CalcButton>
                        <CalcButton onClick={this.numberHandler} className="calc-number">9</CalcButton>
                        <CalcButton onClick={this.operatorHandler} className="calc-operator">x</CalcButton>
                    </div>
                    <div className="calc-row">
                        <CalcButton onClick={this.numberHandler} className="calc-number">4</CalcButton>
                        <CalcButton onClick={this.numberHandler} className="calc-number">5</CalcButton>
                        <CalcButton onClick={this.numberHandler} className="calc-number">6</CalcButton>
                        <CalcButton onClick={this.operatorHandler} className="calc-operator">-</CalcButton>
                    </div>
                    <div className="calc-row">
                        <CalcButton onClick={this.numberHandler} className="calc-number">1</CalcButton>
                        <CalcButton onClick={this.numberHandler} className="calc-number">2</CalcButton>
                        <CalcButton onClick={this.numberHandler} className="calc-number">3</CalcButton>
                        <CalcButton onClick={this.operatorHandler} className="calc-operator">+</CalcButton>
                    </div>
                    <div className="calc-row">
                        <CalcButton onClick={this.numberHandler} className="calc-number bigger-btn">0</CalcButton>
                        <CalcButton onClick={this.operatorHandler} className="calc-operator">.</CalcButton>
                        <CalcButton onClick={this.equalHandler} className="calc-operator">=</CalcButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalcApp;
