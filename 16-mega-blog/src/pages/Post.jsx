import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import appwriteService from "../appwright/service";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10">
      <Container>
        <article className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-2xl mb-8 bg-slate-100 max-h-[460px] flex items-center justify-center">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-auto max-h-[460px] object-cover rounded-2xl"
            />

            {isAuthor && (
              <div className="absolute right-4 top-4 flex items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-md border border-slate-100">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-emerald-600 hover:bg-emerald-700" className="py-2 px-4 text-sm font-semibold">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-rose-600 hover:bg-rose-700" onClick={deletePost} className="py-2 px-4 text-sm font-semibold">
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {post.title}
            </h1>
          </div>

          <div className="browser-css text-slate-700 text-base sm:text-lg leading-relaxed">
            {parse(post.content)}
          </div>
        </article>
      </Container>
    </div>
  ) : null;
}

export default Post;
