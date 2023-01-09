const express = require('express');
const router = express.Router();
const { getGames, setGame, updateGame, deleteGame } = require('../controllers/gameController')

router.route('/').get(getGames).post(setGame);
router.route('/:id').put(updateGame).delete(deleteGame);

module.exports = router;