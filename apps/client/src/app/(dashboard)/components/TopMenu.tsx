"use client";

import React from "react";
import Link from "next/link";
import {
  IconCamera,
  IconMessageCircle,
  IconSearch,
  IconUserCircle,
} from "@tabler/icons-react";

const TopMenu = () => {
  return (
    <div className="flex items-center space-x-1">
      <Link href="/appointments" className="p-2 transition-all hover:opacity-60">
        <IconSearch size={26} />
      </Link>
      <Link href="/photo" className="p-2 transition-all hover:opacity-60">
        <IconCamera size={26} />
      </Link>
      <Link href="/messages" className="p-2 transition-all hover:opacity-60">
        <IconMessageCircle size={26} />
      </Link>
      <Link href="/profile" className="p-2 transition-all hover:opacity-60">
        <IconUserCircle size={26} />
      </Link>
    </div>
  );
};

export default TopMenu;
