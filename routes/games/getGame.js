const { gameRepository } = require("./../../repositories/game.repo");

module.exports = {
  getGame: {
    url: "/games/:id",
    method: "GET",
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
      },
    },
    handler: async (request, reply) => {
      try {
        const targetId = request.params.id;
        const game = await gameRepository.findByPK(targetId);
        return reply.code(200).send(game);
      } catch (error) {
        request.log.error(error);
        return reply.code(404).send({ error: "Game not found" });
      }
    },
  },
};