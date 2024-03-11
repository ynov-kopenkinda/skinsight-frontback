"use client";

import React, { useState } from "react";

import MessageBox from "~/shared/ui/MessageBox";
import TapBar from "../components/TapBar";
import HeaderMessage from "./components/header-message";
import { api } from "~/utils/api/react";
import Searchbar from "./components/searchbar";

function Messages() {
  // TODO change by user ID
  // const { data } = useSession();

  const messages = api.chat.getChatsByUserId.useQuery({ id: 1 });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessage = messages.data?.filter((message) =>
    message.firstname.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <HeaderMessage />
      <Searchbar onSearch={setSearchTerm} />
      {filteredMessage && filteredMessage.length > 0
        ? filteredMessage.map((message) => {
            const lastMessageDate = new Date(message.lastMessageDate);
            const timeFormatted = new Intl.DateTimeFormat("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).format(lastMessageDate);
            return (
              <MessageBox
                key={message.id}
                id={message.id}
                name={message.firstname}
                lastMessageContent={message.lastMessage}
                lastMessageTime={timeFormatted}
                link={`/messages/${message.id}`}
              />
            );
          })
        : "You don't have any messages for the moment."}

      <div className="border-gray glassmorphism container fixed bottom-4 left-0 right-0 z-50 mx-auto block w-fit rounded-xl border-2 bg-white pl-4 pr-4">
        <TapBar />
      </div>
    </div>
  );
}

export default Messages;
