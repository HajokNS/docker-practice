const { gameRepository } = require("./../../repositories/game.repo");

module.exports = {
  deleteGame: {
    url: "/games/:id",
    method: "DELETE",
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
        const deletedGame = await gameRepository.delete(targetId);
        return reply.code(200).send(deletedGame);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to delete game" });
      }
    },
  },
};