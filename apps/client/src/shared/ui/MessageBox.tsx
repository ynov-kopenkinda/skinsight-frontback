import Image from "next/image";
import Link from "next/link";
import { Text } from "@radix-ui/themes";

export interface MessageBoxProps {
  id: number;
  name: string;
  lastMessageContent: string;
  lastMessageTime: string;
  link: string;
}

const MessageBox = ({
  name,
  lastMessageContent,
  lastMessageTime,
  link,
}: MessageBoxProps) => {
  return (
    <div className="after:bg-gray group relative mb-8 after:absolute after:-bottom-4 after:left-1/2 after:h-[2px] after:w-full after:-translate-x-1/2 after:content-normal last-of-type:mb-0 last-of-type:after:content-none">
      <Link href={link} className="flex gap-x-4">
        <Image
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
          alt={name}
          width={56}
          height={56}
          className="rounded-full"
        />
        <div className="flex flex-[1_1_100%] flex-col justify-center">
          <div className="flex justify-between gap-x-2">
            <Text className="text-base font-bold">{name}</Text>
            <Text className="text-gray-strong text-sm">{lastMessageTime}</Text>
          </div>
          <Text className="text-gray-strong text-sm">{lastMessageContent}</Text>
        </div>
      </Link>
    </div>
  );
};

export default MessageBox;
