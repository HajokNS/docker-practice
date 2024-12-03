const { createGame } = require("./createGame");
const { getGames } = require("./getGames");
const { getGame } = require("./getGame");
const { updateGame } = require("./updateGame");
const { deleteGame } = require("./deleteGame");

module.exports.gamesRouter = async function (fastify, opts) {
  fastify.route(createGame);
  fastify.route(getGames);
  fastify.route(getGame);
  fastify.route(updateGame);
  fastify.route(deleteGame);
};