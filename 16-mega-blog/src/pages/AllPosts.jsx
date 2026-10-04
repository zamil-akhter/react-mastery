import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwright/service";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (userData?.$id) {
      console.log("Fetching posts for user:", userData.$id);
      appwriteService.getAllPosts(true, userData.$id).then((posts) => {
        if (posts) {
          setPosts(posts.rows || posts.documents || []);
        }
      });
    }
  }, [userData]);

  return (
    <div className="w-full py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Posts
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Browse and manage all your published articles.
          </p>
        </div>

        {posts?.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8">
            <p className="text-slate-500 dark:text-slate-400 font-medium">No posts found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts?.map((post) => (
              <div key={post.$id} className="h-full">
                <PostCard
                  {...post}
                  isHomePage={false}
                  showActions={true}
                  onDelete={(deletedId) => {
                    setPosts((prevPosts) =>
                      prevPosts.filter((p) => p.$id !== deletedId)
                    );
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
