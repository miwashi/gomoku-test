const router = require('express').Router();
const gameController = require('../controllers/game_controller.js')

/**
 * @swagger
 * /api/game/games:
 *   get:
 *     description: Use login api
 *
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/games', gameController.getGames);

/**
 * @swagger
 * /api/game/games/{id}:
 *   get:
 *     description: Use login api
 *
 *     responses:
 *       '200':
 *         description: A successful response
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

module.exports = router;