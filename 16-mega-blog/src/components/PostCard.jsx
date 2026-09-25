import appwriteService from "../appwright/service";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostCard({ $id, title, featuredImage, userId, isHomePage = false }) {
  const imageUrl = appwriteService.getFilePreview(featuredImage);
  const userData = useSelector((state) => state.auth.user || state.auth.userData);
  const loggedInUserId = userData?.$id;
  const isOwnPost = Boolean(
    loggedInUserId && (loggedInUserId === userId || loggedInUserId === $id)
  );

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
      </div>
    </Link>
  );
}

export default PostCard;
