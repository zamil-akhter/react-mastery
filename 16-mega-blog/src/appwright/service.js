import config from "../config/config.js";
import { Client, TablesDB, Storage, Query } from "appwrite";
import { toast } from "react-toastify";

export class AppwriteService {
  client = new Client();
  tablesDB;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  // Common error handler
  handleError(error, defaultMessage) {
    console.error(defaultMessage, error);

    switch (error?.code) {
      case 401:
        toast.error("Please login to continue.");
        break;

      case 403:
        toast.error("You are not authorized to perform this action.");
        break;

      case 404:
        toast.error("Requested resource was not found.");
        break;

      case 409:
        toast.error("This resource already exists.");
        break;

      default:
        toast.error(error?.message || defaultMessage);
    }
  }

  // Create Post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const response = await this.tablesDB.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });

      toast.success("Post created successfully.");

      return response;
    } catch (error) {
      if (error?.code === 409) {
        toast.error("This slug already exists. Please use a different slug.");
      } else {
        this.handleError(error, "Failed to create post.");
      }

      throw error;
    }
  }

  // Update Post
  async updatePost({ slug, title, content, featuredImage, status }) {
    try {
      const response = await this.tablesDB.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });

      toast.success("Post updated successfully.");

      return response;
    } catch (error) {
      if (error?.code === 404) {
        toast.error("Post not found.");
      } else if (error?.code === 409) {
        toast.error("This slug already exists. Please use a different slug.");
      } else {
        this.handleError(error, "Failed to update post.");
      }

      throw error;
    }
  }

  // Delete Post
  async deletePost(slug) {
    try {
      const response = await this.tablesDB.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: slug,
      });

      toast.success("Post deleted successfully.");

      return response;
    } catch (error) {
      if (error?.code === 404) {
        toast.error("Post not found.");
      } else {
        this.handleError(error, "Failed to delete post.");
      }

      throw error;
    }
  }

  // Get Single Post
  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: slug,
      });
    } catch (error) {
      if (error?.code === 404) {
        toast.error("Post not found.");
      } else {
        this.handleError(error, "Failed to fetch post.");
      }

      throw error;
    }
  }

  // Get All Posts
  async getAllPosts(isSelfPostsOnly = false, userId = null) {
    const options = {
      databaseId: config.appwriteDatabaseId,
      tableId: config.appwriteTableId,
      queries: [Query.orderDesc("$createdAt")],
    };

    console.log("Options before filtering:", options);

    if (isSelfPostsOnly && userId) {
      options.queries.push(Query.equal("userId", userId));
    } else {
      options.queries.push(Query.equal("status", "active"));
    }
    console.log("Options later:", options);

    try {
      const response = await this.tablesDB.listRows(options);

      return response;
    } catch (error) {
      this.handleError(error, "Failed to fetch posts.");
      throw error;
    }
  }

  // Upload File
  async uploadFile(file) {
    try {
      const response = await this.storage.createFile({
        bucketId: config.appwriteBucketId,
        fileId: "unique()",
        file,
      });

      toast.success("Image uploaded successfully.");

      return response;
    } catch (error) {
      this.handleError(error, "Failed to upload image.");
      throw error;
    }
  }

  // Delete File
  async deleteFile(fileId) {
    try {
      const response = await this.storage.deleteFile({
        bucketId: config.appwriteBucketId,
        fileId,
      });

      toast.success("Image deleted successfully.");

      return response;
    } catch (error) {
      if (error?.code === 404) {
        toast.error("Image not found.");
      } else {
        this.handleError(error, "Failed to delete image.");
      }

      throw error;
    }
  }

  // Get File
  getFilePreview(fileId) {
    return this.storage.getFileView({
      bucketId: config.appwriteBucketId,
      fileId,
    });
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
