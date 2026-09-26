import { useState } from "react";
import appwriteService from "../appwright/service";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostCard({
  $id,
  title,
  featuredImage,
  userId,
  status = "active",
  isHomePage = true,
  showActions = false,
}) {
  const imageUrl = appwriteService.getFilePreview(featuredImage);
  const userData = useSelector((state) => state.auth.user || state.auth.userData);
  const loggedInUserId = userData?.$id;
  const isOwnPost = Boolean(
    loggedInUserId && (loggedInUserId === userId || loggedInUserId === $id)
  );
  const [isActive, setIsActive] = useState(status === "active");
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleStatus = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isToggling) return;

    setIsToggling(true);
    try {
      const response = await appwriteService.activeTogglePost($id);
      if (response) {
        setIsActive(response.status === "active");
      }
    } catch (error) {
      console.error("Failed to toggle post status:", error);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <div className="h-full bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
        <div className="relative w-full h-44 overflow-hidden rounded-xl bg-slate-100 mb-4 flex items-center justify-center">
          {isHomePage && isOwnPost && (
            <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-600/95 text-white shadow-md backdrop-blur-xs">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              By You
            </span>
          )}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {title}
        </h2>

        {/* Action Bar: Status Toggle & Delete Button (Only for My Posts section) */}
        {showActions && (
          <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100">
            {/* Status Toggle UI */}
            <div
              className="flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <button
                type="button"
                disabled={isToggling}
                onClick={handleToggleStatus}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isToggling ? "opacity-60 cursor-wait" : ""
                } ${
                  isActive ? "bg-emerald-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    isActive ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                className={`text-xs font-semibold select-none ${
                  isActive ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                {isToggling ? "Updating..." : isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Delete Button UI */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Delete clicked for post:", $id);
              }}
              className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Delete post"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
