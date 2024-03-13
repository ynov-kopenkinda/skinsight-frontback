"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";
import { IconArrowLeft } from "@tabler/icons-react";

interface ChatHeaderProps {
  receptor: string;
}

const ChatHeader = ({ receptor }: ChatHeaderProps) => {
  const router = useRouter();

  return (
    <div className="after:bg-primary relative mb-16 flex items-center text-white after:absolute after:left-[-20%] after:top-[-32px] after:-z-10 after:h-[330%] after:w-[130%] after:content-normal">
      <Button
        className="hover:cursor-pointer"
        variant="ghost"
        onClick={() => router.push("/messages")}
      >
        <IconArrowLeft color="white" />
      </Button>
      <span className="ml-auto mr-auto text-lg font-bold">{receptor}</span>
    </div>
  );
};

export default ChatHeader;
