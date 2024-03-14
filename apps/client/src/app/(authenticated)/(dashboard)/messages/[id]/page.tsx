"use client";

import { useCallback, useEffect, useRef } from "react";
import { differenceInHours } from "date-fns/differenceInHours";

import { useUser } from "~/shared/hooks/useUser";
import InputMessageBox from "~/shared/ui/InputMessageBox";
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
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const user = useUser();
  const {
    data: chat,
    refetch,
    isFetched,
  } = api.chat.getChatEventByChatId.useQuery(
    {
      id: Number(_params.id),
    },
    {
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
    },
  );
  const otherUserId =
    chat?.invitorId === user.data?.id ? chat?.inviteeId : chat?.invitorId;
  const otherUser = api.user.getUserById.useQuery(
    { id: otherUserId! },
    { enabled: !!otherUserId },
  );

  const scrollToEnd = useCallback(() => {
    if (!isFetched) return;
    if (!endOfMessagesRef.current) return;
    console.log("scrolling");
    endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  }, [isFetched]);

  useEffect(() => {
    scrollToEnd();
  }, [scrollToEnd]);

  if (!chat) {
    return <div>No chat founded</div>;
  }

  if (!otherUser.data || !user.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-6">
      <ChatHeader receptor={otherUser.data.firstName} />
      {chat &&
        chat.ChatEvent.length > 0 &&
        chat.ChatEvent.map((message, idx) => {
          return (
            <Message
              message={message}
              key={message.id}
              userID={user.data!.id}
              otherUserFirstName={otherUser.data.firstName}
              firstOfSeries={
                idx === 0 || chat.ChatEvent[idx - 1]!.userId !== message.userId
              }
              showDate={
                idx === 0 ||
                chat.ChatEvent[idx + 1]?.userId !== message.userId ||
                Math.abs(
                  differenceInHours(
                    chat.ChatEvent[idx - 1]!.createdAt,
                    message.createdAt,
                  ),
                ) > 2
              }
            />
          );
        })}
      <InputMessageBox
        chatId={_params.id}
        userId={user.data.id}
        refetch={async () => {
          await refetch();
          scrollToEnd();
        }}
      />
      <div ref={endOfMessagesRef} />
      <div className="border-gray glassmorphism container fixed bottom-4 left-0 right-0 z-50 mx-auto block w-fit rounded-xl border-2 bg-white pl-4 pr-4">
        <TapBar />
      </div>
    </div>
  );
}

export default Chat;
