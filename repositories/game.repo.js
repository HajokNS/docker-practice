const {
    postgresAdapter: { $prisma },
  } = require("./../adapters/postgres");
  
  class GameRepository {
    #prisma;
  
    constructor() {
      this.#prisma = $prisma;
    }
  
    async create(data) {
      return await this.#prisma.game.create({
        data,
      });
    }
  
    async findByPK(id) {
      const game = await this.#prisma.game.findUnique({
        where: { id },
      });
  
      if (!game) {
        throw new Error("Game not found");
      }
  
      return game;
    }
  
    async find({ term, limit, offset, sort }) {
      const games = await this.#prisma.game.findMany({
        where: term ? { title: { contains: term, mode: "insensitive" } } : {},
        skip: offset,
        take: limit,
        orderBy: { [sort]: "desc" },
      });
  
      return games;
    }
  
    async update(id, data) {
      return await this.#prisma.game.update({
        where: { id },
        data,
      });
    }
  
    async delete(id) {
      return await this.#prisma.game.delete({
        where: { id },
      });
    }
  }
  
  module.exports.gameRepository = new GameRepository();
  