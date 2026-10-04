import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../components";
import appwriteService from "../appwright/service";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Edit Post
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Update your article details and save changes.
          </p>
        </div>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
