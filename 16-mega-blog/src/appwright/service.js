import config from "../config/config.js";
import { Client, TablesDB, Storage } from "appwrite";

export class AppwriteService {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, staus, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          staus,
          userId,
        },
      });
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;
