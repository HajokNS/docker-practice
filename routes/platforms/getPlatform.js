const { platformRepository } = require("./../../repositories/platform.repo");

module.exports = {
  getPlatform: {
    url: "/platforms/:id",
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
        const foundPlatform = await platformRepository.findByPK(targetId); 

        if (!foundPlatform) {
          return reply.code(404).send({
            message: "Platform not found",
          });
        }

        return reply.code(200).send(foundPlatform); 
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to fetch platform" }); 
      }
    },
  },
};
