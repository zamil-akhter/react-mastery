import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import appwriteService from "../appwright/service";

function Post() {
  const [post, setPost] = useState(null);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.user);

  const isAuthor = Boolean(
    post && userData && (post.userId === userData.$id || !post.userId)
  );

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    }
  };

  const handleToggleStatus = async () => {
    if (isTogglingStatus || !post) return;
    setIsTogglingStatus(true);
    try {
      const response = await appwriteService.activeTogglePost(post.$id);
      if (response) {
        setPost((prev) => ({ ...prev, status: response.status }));
      }
    } catch (error) {
      console.error("Failed to toggle status:", error);
    } finally {
      setIsTogglingStatus(false);
    }
  };

  return post ? (
    <div className="py-10">
      <Container>
        <article className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          {/* Featured Image */}
          <div className="relative w-full overflow-hidden rounded-2xl mb-8 bg-slate-100 dark:bg-slate-800 max-h-115 flex items-center justify-center">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-auto max-h-115 object-cover rounded-2xl"
            />
          </div>

          {/* Title & Actions Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex-1 min-w-70">
              {post.title}
            </h1>

            {isAuthor && (
              <div className="flex items-center gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-indigo-600 hover:bg-indigo-700"
                    className="py-2 px-4 text-sm font-semibold flex items-center gap-1.5 shadow-xs"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Edit Post
                  </Button>
                </Link>
                <Button
                  bgColor="bg-rose-600 hover:bg-rose-700"
                  onClick={deletePost}
                  className="py-2 px-4 text-sm font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* User Details & Post Metadata Section */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8 border-y border-slate-100 dark:border-slate-800 text-sm">
            {/* Author / User Information */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-bold flex items-center justify-center shadow-md shadow-indigo-500/20 text-base select-none shrink-0">
                {isAuthor
                  ? (userData?.name?.[0] || userData?.email?.[0] || "U").toUpperCase()
                  : "A"}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {isAuthor
                      ? userData?.name || "Author"
                      : (post.userId ? `User (${post.userId.slice(0, 8)})` : "Author")}
                  </span>

                  {isAuthor && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/80">
                      Author (You)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1 flex-wrap">
                  {isAuthor && userData?.email && (
                    <span>{userData.email}</span>
                  )}
                  {post.$createdAt && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(post.$createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Post Status & Slug Badges */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Status Indicator (with toggle if author) */}
              {isAuthor ? (
                <button
                  type="button"
                  disabled={isTogglingStatus}
                  onClick={handleToggleStatus}
                  title="Click to toggle status"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${
                    post.status === "active"
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  } ${isTogglingStatus ? "opacity-60 cursor-wait" : ""}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      post.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                    }`}
                  />
                  <span>{isTogglingStatus ? "Updating..." : post.status || "Active"}</span>
                  <span className="text-[10px] lowercase text-slate-400 font-normal">
                    (tap to change)
                  </span>
                </button>
              ) : (
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border select-none ${
                    post.status === "active"
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      post.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                    }`}
                  />
                  <span>{post.status || "Active"}</span>
                </span>
              )}

              {/* Slug / ID Badge */}
              {post.$id && (
                <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  slug: {post.$id}
                </span>
              )}
            </div>
          </div>

          {/* Post Content */}
          <div className="browser-css text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {parse(post.content)}
          </div>
        </article>
      </Container>
    </div>
  ) : null;
}

export default Post;
