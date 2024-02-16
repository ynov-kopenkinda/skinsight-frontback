"use client";

import React, { useState } from "react";

import type { MessageBoxProps } from "~/shared/ui/MessageBox";
import MessageBox from "~/shared/ui/MessageBox";
import TapBar from "../components/TapBar";
import HeaderMessage from "./components/header-message";
import Searchbar from "./components/searchbar";

function Messages() {
  const messages: MessageBoxProps[] = [
    {
      id: 1,
      avatar: "https://api.dicebear.com/7.x/initials/svg",
      name: "Anna",
      lastMessageContent: "You have a good heart!",
      lastMessageTime: "12:45",
      link: "/",
    },
    {
      id: 2,
      name: "Hendra",
      lastMessageContent: "How are you today?",
      lastMessageTime: "12:45",
      link: "/",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessage = messages.filter((message) =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <HeaderMessage />
      <Searchbar onSearch={setSearchTerm} />
      {filteredMessage.length > 0
        ? filteredMessage.map((message) => (
            <MessageBox
              key={message.id}
              id={message.id}
              avatar={message.avatar}
              name={message.name}
              lastMessageContent={message.lastMessageContent}
              lastMessageTime={message.lastMessageTime}
              link={message.link}
            />
          ))
        : "You don't have any messages for the moment."}
      <div className="border-gray glassmorphism container fixed bottom-4 left-0 right-0 z-50 mx-auto block w-fit rounded-xl border-2 bg-white pl-4 pr-4">
        <TapBar />
      </div>
    </div>
  );
}

export default Messages;
