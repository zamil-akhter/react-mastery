import config from "../config/config.js";
import { Client, Databases, Storage } from "appwrite";

export class AppwriteService {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost ({ title, slug, content, featuredImage, staus, userId}) {}
}

const appwriteService = new AppwriteService();
export default appwriteService;
