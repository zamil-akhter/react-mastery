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

  async updatePost({ slug, title, content, featuredImage, staus }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          staus,
        },
      });
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      return await this.tablesDB.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  }

  async getAllPosts() {
    try {
      return await this.tablesDB.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
      });
    } catch (error) {
      console.error("Error fetching all posts:", error);
      throw error;
    }
  }

  // File upload method
  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: config.appwriteBucketId,
        ID: "unique()",
        file,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;
