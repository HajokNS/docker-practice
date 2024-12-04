const { platformRepository } = require("./../../repositories/platform.repo");

module.exports = {
  deletePlatform: {
    url: "/platforms/:id",
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
        await platformRepository.delete(targetId); 

        return reply.code(200).send({ message: "Platform deleted successfully" }); 
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to delete platform" }); 
      }
    },
  },
};