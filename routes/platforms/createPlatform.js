const { platformRepository } = require("./../../repositories/platform.repo");

module.exports = {
  createPlatform: {
    url: "/platforms",
    method: "POST",
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" }, 
          url: { type: "string", format: "uri" }, 
          description: { type: "string" }, 
        },
        required: ["name", "url"],
      },
    },
    handler: async (request, reply) => {
      try {
        const platformData = request.body;

        const platformId = await platformRepository.create(platformData);

        return reply.code(201).send({ id: platformId });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to create platform" });
      }
    },
  },
};