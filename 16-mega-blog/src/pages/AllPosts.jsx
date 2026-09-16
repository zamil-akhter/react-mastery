import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwright/service";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getAllPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.rows);
      }
    });
  }, []);

  return (
    <Container>
      <div className="flex flex-wrap">
        {posts.map((post) => {
          <div key={post.$id} className="p-2 w-1/4">
            <PostCard post={post} />;
          </div>;
        })}
      </div>
    </Container>
  );
}

export default AllPosts;
