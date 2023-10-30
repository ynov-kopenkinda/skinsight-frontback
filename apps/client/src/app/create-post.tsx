"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";

import { auth } from "@kopenkinda/auth";

import { api } from "~/utils/api/react";

const titles = [
  "The quick brown fox jumps over the lazy dog",
  "Lorem ipsum dolor sit amet",
  "Consectetur adipiscing elit",
];

const contents = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed euismod, nisl quis aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
  "nisi libero eu arcu. Nulla facilisi. Duis auctor, elit nec tincidunt",
];

export const CreateRandomPost = () => {
  const session = api.auth.getSession.useQuery();
  const create = api.post.create.useMutation();
  const router = useRouter();
  if (session.data == null) {
    return null;
  }
  return (
    <Button
      onClick={() => {
        create.mutate(
          {
            content: contents[Math.floor(Math.random() * contents.length)]!,
            title: titles[Math.floor(Math.random() * titles.length)]!,
          },
          {
            onSuccess: () => {
              router.refresh();
            },
          },
        );
      }}
      disabled={create.status === "pending"}
    >
      {create.status === "pending" ? "creating" : "Create random post"}
    </Button>
  );
};
