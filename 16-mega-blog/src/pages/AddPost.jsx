import React from "react";
import { Container, PostForm } from "../components";
function AddPost() {
  return (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Create New Post
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Write and publish a new article for your readers.
          </p>
        </div>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
