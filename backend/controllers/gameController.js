const asyncHandler = require('express-async-handler');

// @desc    Get games
// @route   GET /api/games
// @access  Private
const getGames = asyncHandler(async (req, res) => {
    res.json({ message: 'Get Game' });
})
// @desc    Set game
// @route   POST /api/games
// @access  Private
const setGame = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('Please add a name field')
    }
    res.json({ message: 'Set Game' });
})
// @desc    Update game
// @route   GET /api/game/:id
// @access  Private
const updateGame = asyncHandler(async (req, res) => {
    res.json({ message: `Update Game ${req.params.id}` });
})
// @desc    Delete game
// @route   DELETE /api/games/:id
// @access  Private
const deleteGame = asyncHandler(async (req, res) => {
    res.json({ message: `Delete Game ${req.params.id}` });
})

module.exports = {
    getGames,
    setGame,
    updateGame,
    deleteGame
}