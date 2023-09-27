const router = require('express').Router();
const gameController = require('../controllers/game_controller.js')

/**
 * @swagger
 * /games:
 *   get:
 *     tags:
 *       - Games
 *     description: Retrieve a list of games
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of game objects
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Game'
 *       500:
 *         description: Internal server error
 */
router.get('/games', gameController.getGames);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     tags:
 *       - Games
 *     description: Retrieve a game by its UUID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: UUID of the game to retrieve
 *         in: path
 *         required: true
 *         type: string
 *         format: uuid
 *     responses:
 *       200:
 *         description: A game object
 *         schema:
 *           $ref: '#/definitions/Game'
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 */
router.get('/games/:id', gameController.findGameById);

/**
 * @swagger
 * /api/game/games/add:
 *   get:
 *     description: Use login api
 *
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/games/add', gameController.createGame);

/**
 * @swagger
 * /api/game/player/join/{gameId}/{playerId}:
 *   get:
 *     description: Use login api
 *
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/player/join/:game/:player', gameController.joinGame);

/**
 * @swagger
 * /api/game/player/play/{gameId}/{playerId}/{row}/{col}:
 *   get:
 *     description: Use login api
 *
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/player/play/:game/:player/:col/:row', gameController.play);

/**
 * @swagger
 * /api/game/player/create:
 *   get:
 *     description: Use login api
 *
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/player/create/', gameController.createPlayer);

module.exports = router

/**
 * @swagger
 * definitions:
 *   Game:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - round
 *       - player
 *       - state
 *       - board
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       name:
 *         type: string
 *       round:
 *         type: integer
 *       player:
 *         type: integer
 *       player1:
 *         $ref: '#/definitions/User'
 *         nullable: true
 *       player2:
 *         $ref: '#/definitions/User'
 *         nullable: true
 *       state:
 *         type: string
 *         enum: [waiting, playing, black, white, tie, cancelled]
 *       board:
 *         $ref: '#/definitions/Board'
 *   Board:
 *     type: object
 *     properties:
 *       minInRow:
 *         type: integer
 *       cols:
 *         type: integer
 *         default: 16
 *       rows:
 *         type: integer
 *         default: 16
 *       squares:
 *         type: array
 *         items:
 *           type: array
 *           items:
 *             type: integer
 *         minItems: 16
 *         maxItems: 16
 *   User:
 *     type: object
 *     required:
 *       - id
 *       - name
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       name:
 *         type: string
 */