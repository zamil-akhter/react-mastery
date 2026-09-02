const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};
console.log("Appwrite URL:", config.appwriteUrl);
console.log("Appwrite Project ID:", config.appwriteProjectId);
console.log("Appwrite Database ID:", config.appwriteDatabaseId);
console.log("Appwrite Table ID:", config.appwriteTableId);
console.log("Appwrite Bucket ID:", config.appwriteBucketId);

export default config;
