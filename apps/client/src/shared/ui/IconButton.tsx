import type { ReactNode } from "react";
import Link from "next/link";
import { Text } from "@radix-ui/themes";

interface IconButtonProps {
  background?: string;
  color?: string;
  label?: string;
  extraStyle?: string;
  icon: ReactNode;
  link: string;
}

const IconButton = ({
  background,
  color,
  label,
  extraStyle,
  icon,
  link,
}: IconButtonProps) => {
  return (
    <div className="group">
      <Link href={link} className="flex flex-col items-center space-y-2">
        <div
          className={`${
            background ?? "bg-gray"
          } flex h-12 w-12 flex-col items-center justify-center rounded-lg ${
            extraStyle ? extraStyle : ""
          }`}
        >
          <span className={`rounded-lg p-2 ${color ?? "text-primary"}`}>
            {icon}
          </span>
        </div>
        {label ? (
          <Text className="text-gray-strong transition-all group-hover:text-black">
            {label}
          </Text>
        ) : null}
      </Link>
    </div>
  );
};

export default IconButton;
