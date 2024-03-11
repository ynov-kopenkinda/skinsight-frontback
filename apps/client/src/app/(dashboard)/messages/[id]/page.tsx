import InputMessageBox from "~/shared/ui/InputMessageBox";
import ChatHeader from "./components/ChatHeader";
import Message from "./components/Message";
import TapBar from "../../components/TapBar";

export interface ChatEvent {
  id: number;
  chat_id: number;
  user_id: number;
  reply_to_id: number;
  data: string;
  createdAt: string;
}

export interface Chat {
  id: number;
  messages: ChatEvent[];
}

function Chat({ params: _params }: { params: { id: number } }) {
  const chat: Chat = {
    id: 1,
    messages: [
      {
        id: 1,
        chat_id: 1,
        user_id: 2,
        reply_to_id: 1,
        data: "Hello man, i've looked your picture",
        createdAt: "12h10",
      },
      {
        id: 2,
        chat_id: 1,
        user_id: 1,
        reply_to_id: 2,
        data: "Hello doctor, thanks you, what's your opinion so ?",
        createdAt: "12h10",
      },
      {
        id: 3,
        chat_id: 1,
        user_id: 2,
        reply_to_id: 1,
        data: "You're gonna die, i'm sorry about it",
        createdAt: "12h10",
      },
      {
        id: 4,
        chat_id: 1,
        user_id: 1,
        reply_to_id: 2,
        data: "Sadge but np i'm still a main Yorick !",
        createdAt: "12h10",
      },
      {
        id: 5,
        chat_id: 1,
        user_id: 2,
        reply_to_id: 1,
        data: "Hope you die soon, bye",
        createdAt: "12h10",
      },
      {
        id: 4,
        chat_id: 1,
        user_id: 1,
        reply_to_id: 2,
        data: "Bye have a good day !",
        createdAt: "12h10",
      },
    ],
  };

  return (
    <div className="mt-6">
      <ChatHeader receptor={"Dr. Anna"} />
      {chat &&
        chat.messages.length > 0 &&
        chat.messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      <InputMessageBox />
      <div className="border-gray glassmorphism container fixed bottom-4 left-0 right-0 z-50 mx-auto block w-fit rounded-xl border-2 bg-white pl-4 pr-4">
        <TapBar />
      </div>
    </div>
  );
}

export default Chat;
