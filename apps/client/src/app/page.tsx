import { Card, Flex, Text } from "@radix-ui/themes";

import { RouterOutputs } from "@kopenkinda/api";

import { api } from "~/utils/api/server";
import { AuthShowcase } from "./auth";
import { CreateRandomPost } from "./create-post";

const Post = (post: RouterOutputs["post"]["all"][0]) => {
  return (
    <Card>
      <Flex direction="column" gap="1">
        <Text weight="bold" size="4">
          <Text color="gray" weight="regular" size="1">
            #{post.id}
          </Text>{" "}
          {post.title}
        </Text>
        <Text>{post.content}</Text>
      </Flex>
    </Card>
  );
};

export default async function HomePage() {
  const data = await api.post.all.query();
  return (
    <div className="container mx-auto">
      <Flex direction="column" gap="2" py="4">
        <AuthShowcase />
        <CreateRandomPost />
        {data.map((post) => (
          <Post {...post} key={post.id} />
        ))}
      </Flex>
    </div>
  );
}
