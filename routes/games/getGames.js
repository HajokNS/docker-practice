const { gameRepository } = require("./../../repositories/game.repo");

module.exports = {
  getGames: {
    url: "/games",
    method: "GET",
    handler: async (request, reply) => {
      try {
        const games = await gameRepository.read();
        return reply.code(200).send(games);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to fetch games" });
      }
    },
  },
};