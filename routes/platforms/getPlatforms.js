const { platformRepository } = require("./../../repositories/platform.repo");

module.exports = {
  getPlatforms: {
    url: "/platforms",
    method: "GET",
    schema: {
      querystring: {
        type: "object",
        properties: {
          limit: { type: "integer", minimum: 1 },
          offset: { type: "integer", minimum: 0 },
          search: { type: "string" }, 
          sort: { type: "string" },  
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const { limit = 10, offset = 0, search, sort = "createdAt" } = request.query;

        const filter = search ? { name: { contains: search } } : {};

        const platforms = await platformRepository.find({
          filter,
          limit: parseInt(limit),
          offset: parseInt(offset),
          sort,
        });

        return reply.code(200).send(platforms);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to fetch platforms" });
      }
    },
  },
};
