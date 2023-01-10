const asyncHandler = require('express-async-handler');
const gameModel = require('../models/gameModel');

const Game = require('../models/gameModel')
const User = require('../models/userModel')

// @desc    Get games
// @route   GET /api/games
// @access  Private
const getGames = asyncHandler(async (req, res) => {
    const games = await Game.find({ user: req.user.id });

    res.json(games);
})

// @desc    Set game
// @route   POST /api/games
// @access  Private
const setGame = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('Please add a name field')
    }

    const game = await Game.create({
        name: req.body.name,
        user: req.user.id,
    })

    res.json(game);
})

// @desc    Update game
// @route   GET /api/game/:id
// @access  Private
const updateGame = asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);

    if (!game) {
        res.status(400);
        throw new Error('Game not found');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found')
    }

    if (game.user.toString() !== user.id) {
        res.status(401);
        throw new Error('Not allowed')
    }

    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.json(updatedGame);
})

// @desc    Delete game
// @route   DELETE /api/games/:id
// @access  Private
const deleteGame = asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);

    if (!game) {
        res.status(400);
        throw new Error('Game not found');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found')
    }

    if (game.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized')
    }

    await game.remove();

    res.json({ message: `${game.name} removed` });
})

module.exports = {
    getGames,
    setGame,
    updateGame,
    deleteGame
}