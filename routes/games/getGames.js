const { gameRepository } = require("./../../repositories/game.repo");

module.exports = {
  getGames: {
    url: "/games",
    method: "GET",
    schema: {
      querystring: {
        type: "object",
        properties: {
          term: { type: "string" },
          limit: { type: "integer", minimum: 1, default: 10 },
          offset: { type: "integer", minimum: 0, default: 0 },
          sort: { type: "string", enum: ["title", "createdAt", "updatedAt"], default: "title" },
        },
        required: [],
      },
    },
    handler: async (request, reply) => {
      try {
        const { term, limit, offset, sort } = request.query;

        const games = await gameRepository.find({ term, limit, offset, sort });
        return reply.code(200).send(games);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to fetch games" });
      }
    },
  },
};