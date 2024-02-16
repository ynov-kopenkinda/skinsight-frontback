import type { ChatEvent } from "../page";

interface MessageProps {
  message: ChatEvent;
}

const Message = ({ message }: MessageProps) => {
  const sessionId = 1;

  const isSender = message.user_id === sessionId ? true : false;

  return (
    <div
      className={`${
        isSender ? "bg-primary text-white" : "ml-auto bg-white"
      } border-gray relative mb-12 w-fit rounded-lg border p-3 last-of-type:mb-0`}
    >
      {message.data}
      <span className="text-gray-strong absolute -bottom-7 left-0 text-sm">
        {message.createdAt}
      </span>
    </div>
  );
};

export default Message;
