const { platformRepository } = require("./../../repositories/platform.repo");

module.exports = {
  updatePlatform: {
    url: "/platforms/:id",
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
        properties: {
          name: { type: "string" },
          url: { type: "string", format: "uri" },
          description: { type: "string" },
        },
        required: ["name", "url", "description"],
      },
    },
    handler: async (request, reply) => {
      try {
        const targetId = request.params.id; 
        const platformData = request.body; 

        const updatedPlatform = await platformRepository.update(targetId, platformData); 

        return reply.code(200).send(updatedPlatform); 
      } catch (error) {
        request.log.error(error); 
        return reply.code(500).send({ error: "Failed to update platform" }); 
      }
    },
  },
};
