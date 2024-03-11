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
  iconFullRounded?: boolean;
}

const IconButton = ({
  background,
  color,
  label,
  extraStyle,
  icon,
  link,
  iconFullRounded,
}: IconButtonProps) => {
  return (
    <div className="group">
      <Link href={link} className="flex flex-col items-center space-y-2">
        <div
          className={`${background ?? "bg-gray"} ${
            extraStyle ? extraStyle : ""
          } flex h-12 w-12 flex-col items-center justify-center ${
            iconFullRounded ? "rounded-full" : "rounded-lg"
          }`}
        >
          <span
            className={`${
              iconFullRounded ? "rounded-full" : "rounded-lg"
            } p-2 ${color ?? "text-primary"}`}
          >
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
