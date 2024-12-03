const { gameRepository } = require("./../../repositories/game.repo");

module.exports = {
  updateGame: {
    url: "/games/:id",
    method: "PUT",
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
      },
      body: {
        type: "object",
        required: ["title", "developer"],
        properties: {
          title: { type: "string" },
          developer: { type: "string" },
          releaseYear: { type: "number" },
          genre: { type: "string" },
          price: { type: "number" },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const targetId = request.params.id;
        const { title, developer, releaseYear, genre, price } = request.body;

        const updatedGame = await gameRepository.update(targetId, {
          title,
          developer,
          releaseYear,
          genre,
          price,
        });

        return reply.code(200).send(updatedGame);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to update game" });
      }
    },
  },
};