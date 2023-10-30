import { RouterOutputs } from "@kopenkinda/api";

import { api } from "~/utils/api/server";
import { AuthShowcase } from "./auth";
import { CreateRandomPost } from "./create-post";

const Post = (post: RouterOutputs["post"]["all"][0]) => {
  return (
    <div className="container mx-auto mb-4 border p-2">
      <h3 className="font-bold">{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
};

export default async function HomePage() {
  const data = await api.post.all.query();
  return (
    <div>
      <AuthShowcase />
      {data.map((post) => (
        <Post {...post} key={post.id} />
      ))}
      <CreateRandomPost />
    </div>
  );
}
