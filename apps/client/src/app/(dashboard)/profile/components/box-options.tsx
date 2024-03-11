import React from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

import IconButton from "~/shared/ui/IconButton";

interface BoxOptionsProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  link: string;
  isLogOutButton?: boolean;
}

const BoxOptions = ({
  icon,
  title,
  subtitle,
  link,
  isLogOutButton,
}: BoxOptionsProps) => {
  return (
    <div className="group relative z-10 flex w-full items-center gap-x-4 p-4">
      <IconButton
        icon={icon}
        link="#"
        iconFullRounded={true}
        extraStyle="rounded-full"
        background={isLogOutButton ? "bg-red-50" : "bg-gray"}
        color={isLogOutButton ? "text-red-500" : "text-primary"}
      />
      <div className="flex flex-col gap-y-1">
        <p
          className={`font-semibold ${isLogOutButton ? "text-red-500" : null}`}
        >
          {title}
        </p>
        <p className="text-gray-strong text-sm font-light">{subtitle}</p>
      </div>
      {isLogOutButton ? (
        <Link
          onClick={async () => await signOut()}
          className="smooth-transition ml-auto before:absolute before:left-0 before:top-0 before:h-full before:w-full before:content-normal before:bg-transparent after:absolute after:left-0 after:top-0 after:z-20 after:h-full after:w-full after:content-normal before:hover:-z-10 before:hover:bg-slate-50"
          href={link}
        >
          <IconChevronRight color="#8A8A8E" />
        </Link>
      ) : (
        <Link
          className="smooth-transition ml-auto before:absolute before:left-0 before:top-0 before:h-full before:w-full before:content-normal before:bg-transparent after:absolute after:left-0 after:top-0 after:z-20 after:h-full after:w-full after:content-normal before:hover:-z-10 before:hover:bg-slate-50"
          href={link}
        >
          <IconChevronRight color="#8A8A8E" />
        </Link>
      )}
    </div>
  );
};

export default BoxOptions;
