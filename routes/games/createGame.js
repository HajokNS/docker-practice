const { gameRepository } = require("./../../repositories/game.repo");

module.exports = {
  createGame: {
    url: "/games",
    method: "POST",
    bodyLimit: 1024,
    schema: {
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
        const { title, developer, releaseYear = null, genre = "Unknown", price = 0 } = request.body;

        const game = await gameRepository.create({
          title,
          developer,
          releaseYear,
          genre,
          price,
        });

        return reply.code(201).send(game);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to create game" });
      }
    },
  },
};