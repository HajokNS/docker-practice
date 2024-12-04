const {
    mongoDBAdapter: { $db, asObjectId },
  } = require("./../adapters/mongodb");
  
  class PlatformRepository {
    #db;
  
    #collection;
  
    constructor() {
      this.#db = $db;
      this.#collection = $db.collection("platforms");
    }
  
    async create(data) {
      const { name, description, url } = data;
  
      const newPlatform = {
        name,
        description,
        url,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      const result = await this.#collection.insertOne(newPlatform);
  
      return result.insertedId.toString();
    }
  
    async findById(id) {
      if (id) {
        const platform = await this.#collection.findOne({ _id: asObjectId(id) });
  
        if (!platform) {
          throw new Error("Platform not found");
        }
  
        return platform;
      } else {
        const platforms = await this.#collection.find().toArray();
        return platforms;
      }
    }
  
    async update(id, data) {
      const result = await this.#collection.updateOne(
        { _id: asObjectId(id) },
        { $set: { ...data, updatedAt: new Date() } }
      );
  
      if (result.matchedCount === 0) {
        throw new Error("Platform not found");
      }
  
      const updatedPlatform = await this.findById(id);
      return updatedPlatform;
    }
  
    async delete(id) {
      const result = await this.#collection.deleteOne({ _id: asObjectId(id) });
  
      if (result.deletedCount === 0) {
        throw new Error("Platform not found");
      }
  
      return { message: "Platform deleted", id };
    }
  
    async find({ name, limit = 10, offset = 0, sort = "createdAt" }) {
      const query = {
        ...(name && { name: { $regex: name, $options: "i" } }),
      };
  
      const platforms = await this.#collection
        .find(query)
        .skip(offset)
        .limit(limit)
        .sort({ [sort]: -1 })
        .toArray();
  
      return platforms;
    }
  }
  
  module.exports.platformRepository = new PlatformRepository();
  