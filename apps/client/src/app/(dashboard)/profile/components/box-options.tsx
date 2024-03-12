"use client";

import React from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

import { useUser } from "~/shared/hooks/useUser";
import IconButton from "~/shared/ui/IconButton";
import { api } from "~/utils/api/react";

interface BoxOptionsProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  link: string;
  isLogOutButton?: boolean;
  isDeleteAccountButton?: boolean;
}

const BoxOptions = ({
  icon,
  title,
  subtitle,
  link,
  isLogOutButton,
  isDeleteAccountButton,
}: BoxOptionsProps) => {
  const { mutateAsync } = api.user.deleteUserById.useMutation();
  const user = useUser();

  const handleLogoutAndDeleteAccount = async () => {
    if (isLogOutButton) {
      await signOut();
    } else if (isDeleteAccountButton) {
      await signOut();
      await mutateAsync({ id: user.data!.id });
    }
  };

  return (
    <div
      className={`group relative z-10 flex w-full items-center gap-x-4 p-4 ${
        isDeleteAccountButton ? "bg-red-500" : null
      }`}
    >
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
          className={`${
            isDeleteAccountButton ? "text-white" : null
          } font-semibold ${isLogOutButton ? "text-red-500" : null}`}
        >
          {title}
        </p>
        <p
          className={`${
            isDeleteAccountButton ? "text-white" : null
          } text-gray-strong text-sm font-light`}
        >
          {subtitle}
        </p>
      </div>
      {isDeleteAccountButton ? (
        <Link
          onClick={() => handleLogoutAndDeleteAccount()}
          className={`smooth-transition ml-auto before:absolute before:left-0 before:top-0 before:h-full before:w-full before:content-normal before:bg-transparent after:absolute after:left-0 after:top-0 after:z-20 after:h-full after:w-full after:content-normal before:hover:-z-10 ${
            !isDeleteAccountButton ? "before:hover:bg-slate-50" : null
          }`}
          href={link}
        >
          <IconChevronRight
            color={`${isDeleteAccountButton ? "#ffffff" : "#8A8A8E"}`}
          />
        </Link>
      ) : null}
      {isLogOutButton ? (
        <Link
          onClick={() => handleLogoutAndDeleteAccount()}
          className="smooth-transition ml-auto before:absolute before:left-0 before:top-0 before:h-full before:w-full before:content-normal before:bg-transparent after:absolute after:left-0 after:top-0 after:z-20 after:h-full after:w-full after:content-normal before:hover:-z-10 before:hover:bg-slate-50"
          href={link}
        >
          <IconChevronRight color="#8A8A8E" />
        </Link>
      ) : null}
      {!isDeleteAccountButton && !isLogOutButton ? (
        <Link
          className="smooth-transition ml-auto before:absolute before:left-0 before:top-0 before:h-full before:w-full before:content-normal before:bg-transparent after:absolute after:left-0 after:top-0 after:z-20 after:h-full after:w-full after:content-normal before:hover:-z-10 before:hover:bg-slate-50"
          href={link}
        >
          <IconChevronRight color="#8A8A8E" />
        </Link>
      ) : null}
    </div>
  );
};

export default BoxOptions;
