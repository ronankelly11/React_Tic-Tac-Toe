import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {

    // The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
    // When the button is clicked, React will call the onClick event handler that is defined in Square’s render() method.
    // This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
    // Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls the Board’s handleClick(i) when clicked.
    // We have not defined the handleClick() method yet, so our code crashes. If you click a square now, you should see a red error screen saying something like “this.handleClick is not a function”.
    return (
    <button 
        className="square" 
        onClick={() => props.onClick()} // This is now calling Board's onClick method to update the value in the Squares array, rather than Square changing and storing the value.
    >
        {props.value}
    </button>
    );
  }
  
class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    handleClick(i){
        // We slice (i.e. copy) as we don't want to mutate the squares array.
        const squares = this.state.squares.slice()
        squares[i] = 'X';
        this.setState({squares: squares})
    }


    renderSquare(i) {
        return (
        <Square 
            value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
        />
        );
    }

    render() {
        const status = 'Next player: X';

        return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
        <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
            </div>
        </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  