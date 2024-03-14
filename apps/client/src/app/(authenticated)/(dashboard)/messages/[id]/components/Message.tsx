import { S3Image } from "~/shared/ui/S3Image";
import type { ChatEvent } from "../page";
import MessageAppointment from "./MessageAppointment";

interface MessageProps {
  message: ChatEvent;
  userID: number;
  otherUserFirstName: string;
  firstOfSeries?: boolean;
  showDate?: boolean;
}

export function getFormatter() {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

const Message = ({
  message,
  userID,
  otherUserFirstName,
  firstOfSeries,
  showDate,
}: MessageProps) => {
  const date = new Date(message.createdAt);
  const formattedDate = getFormatter().format(date);

  const isOther = message.userId !== userID;

  const getMessageToShow = () => {
    switch (message.chatEventType) {
      case "MESSAGE_SENT": {
        return message.data;
      }
      case "IMAGE_SENT": {
        return <S3Image s3key={message.data} />;
      }
      case "APPOINTMENT_INVITE_SENT": {
        const data = JSON.parse(message.data) as {
          text: string;
          doctorID: number;
          location: string;
        };

        return <MessageAppointment data={data} patientID={userID} />;
      }
    }
  };

  return (
    <div className={`flex flex-col gap-y-1 ${showDate ? "mb-4" : "mb-1"}`}>
      {firstOfSeries && (
        <p
          className={`text-gray-strong text-sm ${
            isOther ? "text-left" : "text-right"
          }`}
        >
          {isOther ? otherUserFirstName : "You"}
        </p>
      )}
      <div
        className={`${
          isOther ? "bg-white" : "bg-primary ml-auto text-white"
        } border-gray relative w-fit rounded-lg border p-3 last-of-type:mb-0`}
      >
        {getMessageToShow()}
      </div>
      {showDate && (
        <p
          className={`text-gray-strong text-sm ${
            isOther ? "text-left" : "text-right"
          }`}
        >
          {formattedDate}
        </p>
      )}
    </div>
  );
};

export default Message;
