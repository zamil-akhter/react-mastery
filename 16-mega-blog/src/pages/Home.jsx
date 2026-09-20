import { useEffect, useState } from "react";
import appwriteService from "../appwright/service";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.rows || posts.documents || []);
      }
    });
  }, []);

  if (posts?.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <Container>
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 md:p-14 border border-slate-200/80 shadow-xl shadow-slate-200/40">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl">
              ✍️
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                MegaBlog
              </span>
            </h1>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Explore stories, ideas, and expertise from creators around the globe. Log in or create an account to start publishing and reading posts!
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-500/20 hover:shadow-lg transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all duration-200"
              >
                Create Account
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Latest Articles
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Discover the freshest ideas and insights from our community.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="h-full">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
