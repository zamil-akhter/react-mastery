const config = {
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID

};
    console.log('Appwrite URL:', config.appwriteUrl);
    console.log('Appwrite Project ID:', config.appwriteProjectId);
    console.log('Appwrite Database ID:', config.appwriteDatabaseId);
    console.log('Appwrite Collection ID:', config.appwriteCollectionId);
    console.log('Appwrite Bucket ID:', config.appwriteBucketId);   

export default config;
