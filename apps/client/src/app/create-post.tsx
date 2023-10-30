"use client";

import { useRouter } from "next/navigation";

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
  const create = api.post.create.useMutation();
  const router = useRouter();
  return (
    <button
      className="container mx-auto mb-4 block border bg-stone-200 p-2 hover:bg-stone-300"
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
    </button>
  );
};
