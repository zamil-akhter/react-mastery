import appwriteService from "../appwright/service";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  const imageUrl = appwriteService.getFilePreview(featuredImage);

  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <div className="h-full bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
        <div className="w-full h-44 overflow-hidden rounded-xl bg-slate-100 mb-4 flex items-center justify-center">
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
