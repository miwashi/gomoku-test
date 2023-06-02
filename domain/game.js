//https://en.wikipedia.org/wiki/Go_(game)

const uuid = require('uuid');
const gomokuHandler = require('./gomoku.js');
const playerHandler = require('./player.js');
const ERR_MSGS = require('../util/error_messages.js');

let numGames = 0;
const COLS = 10;
const ROWS = 10;
const games = [];


const createGame = (name) => {
    if(!name){
        name = "game_" + numGames++;
    }
    const board = gomokuHandler.createBoard()
    const game = {
        id: uuid.v4(),
        name: name,
        round: 1,
        player: 0,
        player1: null,
        player2: null,
        board: board
    };
    games.push(game);
    return game;
}

const saveGame = (game) => {
    return game;
}

createGame("demo1");
createGame("demo1");
createGame("demo3");
createGame("demo4");

const getGames = () => {
    return games;
}

const addPlayer = (id, playerName) => {
    if(!id)  {
        throw ERR_MSGS.ERR_GAME_NOT_FOUND;
    }
    const game = findGameById(id);
    if(!(!game.player1 && !game.player2)) {
        throw ERR_MSGS.ERR_GAME_FULL;
    }

    if(!playerName) return game;

    if(game.players.length > 1) return game;
    game.players.push(playerName);
    return game;
}

const play = (id, playerId, col, row) => {
    if(!id) throw ERR_MSGS.ERR_GAME_NOT_FOUND;
    const game = findGameById(id);
    if(!game) throw ERR_MSGS.ERR_GAME_NOT_FOUND;
    if(!playerId) throw ERR_MSGS.ERR_PLAYER_NOT_FOUND;

    game.round++;
    game.player = (game.round % 2) + 1;
    game.board.squares[col][row] = game.player;
    return game;
}

const findGamesByName = (name) => {
    return games.filter( game => game.name === name );
}

const findGameById = (id) => {
    if(!id) throw ERR_MSGS.ERR_GAME_NOT_FOUND;
    const game = games.find( game => game.id === id );
    if(!game) throw ERR_MSGS.ERR_GAME_NOT_FOUND;

    return game;
}

module.exports = {
    play,
    createGame,
    saveGame,
    getGames,
    findGameById,
    findGamesByName,
    addPlayer
}