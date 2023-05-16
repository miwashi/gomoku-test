const router = require('express').Router();
const gameController = require('../controllers/game_controller.js')


router.get('/games', gameController.getGames);

router.get('/games/:id', gameController.findGameById);

router.get('/games/add', gameController.createGame);

router.get('/player/join/:game/:player', gameController.joinGame);

router.get('/player/play/:game/:player/:col/:row', gameController.play);

router.get('/player/create/', gameController.createPlayer);

module.exports = router;