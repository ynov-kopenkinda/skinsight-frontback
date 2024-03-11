"use client";

import React from "react";
import { differenceInHours } from "date-fns/differenceInHours";

import { useUser } from "~/shared/hooks/useUser";
import { api } from "~/utils/api/react";
import TapBar from "../../components/TapBar";
import ChatHeader from "./components/ChatHeader";
import Message from "./components/Message";

export interface ChatEvent {
  id: number;
  chatId: number;
  userId: number;
  data: string;
  createdAt: string;
  chatEventType: string;
}

export interface Chat {
  id: number;
  inviteeId: number;
  invitorId: number;
  createdAt: string;
  ChatEvent: ChatEvent[];
}

function Chat({ params: _params }: { params: { id: number } }) {
  const user = useUser();
  const chat = api.chat.getChatEventByChatId.useQuery({
    id: Number(_params.id),
  });
  const otherUserId =
    chat.data?.invitorId === user.data?.id
      ? chat.data?.inviteeId
      : chat.data?.invitorId;
  const otherUser = api.user.getUserById.useQuery(
    { id: otherUserId! },
    { enabled: !!otherUserId },
  );

  if (!chat.data) {
    return <div>No chat founded</div>;
  }

  if (!otherUser.data || !user.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-6">
      <ChatHeader receptor={otherUser.data.firstName} />
      {chat.data &&
        chat.data.ChatEvent.length > 0 &&
        chat.data.ChatEvent.map((message, idx) => {
          return (
            <Message
              message={message}
              key={message.id}
              userID={user.data!.id}
              otherUserFirstName={otherUser.data.firstName}
              firstOfSeries={
                idx === 0 ||
                chat.data.ChatEvent[idx - 1]!.userId !== message.userId
              }
              showDate={
                idx === 0 ||
                chat.data.ChatEvent[idx + 1]?.userId !== message.userId ||
                Math.abs(
                  differenceInHours(
                    chat.data.ChatEvent[idx - 1]!.createdAt,
                    message.createdAt,
                  ),
                ) > 2
              }
            />
          );
        })}
      {/* <InputMessageBox /> */}
      <div className="border-gray glassmorphism container fixed bottom-4 left-0 right-0 z-50 mx-auto block w-fit rounded-xl border-2 bg-white pl-4 pr-4">
        <TapBar />
      </div>
    </div>
  );
}

export default Chat;
