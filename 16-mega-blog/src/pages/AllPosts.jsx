import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwright/service";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.rows || posts.documents || []);
      }
    });
  }, []);

  return (
    <div className="w-full py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            All Posts
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse through all published stories and articles.
          </p>
        </div>

        {posts?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 p-8">
            <p className="text-slate-500 font-medium">No posts found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts?.map((post) => (
              <div key={post.$id} className="h-full">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
