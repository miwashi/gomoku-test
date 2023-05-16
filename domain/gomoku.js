//https://en.wikipedia.org/wiki/Go_(game)

require('dotenv').config();

const ERR_MSGS = require('../util/error_messages.js');

const MINIMUM_WIN_LENGTH = 5;
const DEFAULT_COLS = 16;
const DEFAULT_ROWS = DEFAULT_COLS;

const COLS = process.env.COLS || DEFAULT_COLS;
const ROWS = process.env.ROWS || DEFAULT_ROWS;

const isTie = (board) => {
    for (let col = 1; col <= (board.cols); col++){
        for (let row = 1; row <= (board.cols); row++){
            if(board.squares[col][row] == 0) return false;
        }
    }
    return !isWin(board);
}

const isWin = (board) => {
    for (let col = 1; col <= (board.cols); col++){
        for (let row = 1; row <= (board.cols); row++){
            const square = {col: col, row: row};
            if(testRow(diagonal(square), board)) return true;
            if(testRow(horizontal(square), board)) return true;
            if(testRow(vertical(square), board)) return true;
        }
    }
    return false;
}

const createBoard = () => {
    const board = {
        minInRow: MINIMUM_WIN_LENGTH,
        cols: COLS,
        rows: ROWS,
        squares: []
    }
    for (let i = 0; i < COLS + 1; i++) {
        board.squares.push(Array(ROWS + 1));
    }
    for(let col = 0; col <= board.squares.length - 1; col++){
        for(let row = 0; row <= board.squares.length - 1; row++){
                board.squares[col][row] = 0;
        }
    }
    return board;
}

const play = (board, col, row, player) => {
    if(col <= 0 || row <= 0){
        throw(ERR_MSGS.ERR_SQUARE_OUT_OF_BOUNDS);
    }
    if(col > COLS || row > ROWS){
        throw(ERR_MSGS.ERR_SQUARE_OUT_OF_BOUNDS);
    }

    if(board.squares[col][row] == 0){
        board.squares[col][row] = player;
    }else{
        throw new Error(ERR_MSGS.ERR_SQUARE_OCCUPIED);
    }
    return board;
}

const testRow = (row, board) => {
    for(let square of row){
        if(square.row > board.rows) return false;
        if(square.col > board.cols) return false;
    }

    let player = null;
    for(let square of row){
        player = board.squares[square.col][square.row];
        if(player == null) return false;
    }

    for(let square of row){
        if(player != board.squares[square.col][square.row]) return false;
    }
    return true;
}

const diagonal = (square) => {
    return [
        {col: square.col, row: square.row},
        {col: square.col + 1, row: square.row + 1},
        {col: square.col + 2, row: square.row + 2},
        {col: square.col + 3, row: square.row + 3},
        {col: square.col + 4, row: square.row + 4}
    ];
}

const horizontal = (square) => {
    return [
        {col: square.col, row: square.row},
        {col: square.col + 1, row: square.row},
        {col: square.col + 2, row: square.row},
        {col: square.col + 3, row: square.row},
        {col: square.col + 4, row: square.row}
    ];
}

const vertical = (square) => {
    return [
        {col: square.col, row: square.row},
        {col: square.col, row: square.row + 1},
        {col: square.col, row: square.row + 2},
        {col: square.col, row: square.row + 3},
        {col: square.col, row: square.row + 4}
    ];
}

module.exports = {play, isTie, isWin, createBoard}