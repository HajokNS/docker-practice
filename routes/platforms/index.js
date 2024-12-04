const { createPlatform } = require("./createPlatform");
const { getPlatforms } = require("./getPlatforms");
const { getPlatform } = require("./getPlatform");
const { updatePlatform } = require("./updatePlatform");
const { deletePlatform } = require("./deletePlatform");

module.exports.platformsRouter = async function (fastify, opts) {
  fastify.route(createPlatform);
  fastify.route(getPlatforms);
  fastify.route(getPlatform);
  fastify.route(updatePlatform);
  fastify.route(deletePlatform);
};