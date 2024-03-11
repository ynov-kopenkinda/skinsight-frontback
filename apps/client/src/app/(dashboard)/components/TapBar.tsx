"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  IconCalendarCheck,
  IconCamera,
  IconHome,
  IconMessageCircle,
  IconUserCircle,
} from "@tabler/icons-react";

import IconButton from "~/shared/ui/IconButton";

const TapBar = () => {
  const currentRoute = usePathname();

  return (
    <div className="flex items-center justify-center gap-x-4 p-2">
      <IconButton
        icon={<IconHome />}
        link="/"
        background={`${currentRoute === "/" ? "bg-primary" : "bg-transparent"}`}
        color={`${currentRoute === "/" ? "text-white" : "text-gray-strong"}`}
        extraStyle={`${
          currentRoute === "/" ? "shadow-lg shadow-[#737ae0]" : ""
        }`}
      />
      <IconButton
        icon={<IconCalendarCheck />}
        link="/appointments"
        background={`${
          currentRoute === "/appointments" ? "bg-primary" : "bg-transparent"
        }`}
        color={`${
          currentRoute === "/appointments" ? "text-white" : "text-gray-strong"
        }`}
        extraStyle={`${
          currentRoute === "/appointments" ? "shadow-xl shadow-[#737ae0]" : ""
        }`}
      />
      <IconButton
        icon={<IconCamera />}
        link="/photo"
        background={`${
          currentRoute.startsWith('/photo') ? "bg-primary" : "bg-transparent"
        }`}
        color={`${
          currentRoute.startsWith('/photo') ? "text-white" : "text-gray-strong"
        }`}
        extraStyle={`${
          currentRoute.startsWith('/photo') ? "shadow-xl shadow-[#737ae0]" : ""
        }`}
      />
      <IconButton
        icon={<IconMessageCircle />}
        link="/messages"
        background={`${
          currentRoute.startsWith('/messages') ? "bg-primary" : "bg-transparent"
        }`}
        color={`${
          currentRoute.startsWith('/messages') ? "text-white" : "text-gray-strong"
        }`}
        extraStyle={`${
          currentRoute.startsWith('/messages') ? "shadow-xl shadow-[#737ae0]" : ""
        }`}
      />
      <IconButton
        icon={<IconUserCircle />}
        link="/profile"
        background={`${
          currentRoute.startsWith('/profile') ? "bg-primary" : "bg-transparent"
        }`}
        color={`${
          currentRoute.startsWith('/profile') ? "text-white" : "text-gray-strong"
        }`}
        extraStyle={`${
          currentRoute.startsWith('/profile') ? "shadow-xl shadow-[#737ae0]" : ""
        }`}
      />
    </div>
  );
};

export default TapBar;
