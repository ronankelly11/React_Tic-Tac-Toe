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
        onClick={props.onClick} // This is now calling Board's onClick method to update the value in the Squares array, rather than Square changing and storing the value.
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
            xIsNext: true,
        };
    }

    handleClick(i){
        // We slice (i.e. copy) as we don't want to mutate the squares array.
        const squares = this.state.squares.slice()
        if (calculateWinner(squares || squares[i])){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
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
        const winner = calculateWinner(this.state.squares)
        /**
         * let allows you to declare variables that are limited to the scope of a block statement, 
         * or expression on which it is used, unlike the var keyword, which declares a variable globally, 
         * or locally to an entire function regardless of block scope
         * **/
        let status;
        if (winner){
            status = 'Winner: ' + winner;
        }
        else{
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')
        }

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

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  