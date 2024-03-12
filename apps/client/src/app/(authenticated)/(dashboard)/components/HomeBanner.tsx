import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading, Text } from "@radix-ui/themes";
import { IconChevronRight } from "@tabler/icons-react";

const HomeBanner = () => {
  return (
    <div className="bg-primary after:bg-primary before:bg-primary relative flex items-center gap-x-2 rounded-2xl p-6 before:absolute before:-bottom-7 before:left-1/2 before:-z-20 before:h-full before:w-[80%] before:-translate-x-1/2 before:content-normal before:rounded-2xl before:bg-opacity-10 after:absolute after:-bottom-4 after:left-1/2 after:-z-10 after:h-full after:w-[90%] after:-translate-x-1/2 after:content-normal after:rounded-2xl after:bg-opacity-30">
      <div className="relative flex basis-1/2 items-center justify-center">
        <Image
          className="h-auto max-w-full -translate-y-2 scale-[1.4]"
          src={"/home-doctor.png"}
          alt="doctor"
          width={120}
          height={180}
        />
      </div>
      <div className="flex basis-1/2 flex-col gap-y-2 text-white">
        <Heading as="h2" className="text-sm">
          Simple ways for healthy life
        </Heading>
        <Text className="text-xs sm:text-sm">
          Check-up on your health of your skin with a click of a button
        </Text>
        <Link
          className="relative mt-2 flex w-fit items-center gap-x-2 text-xs after:absolute after:bottom-[-6px] after:left-0 after:h-[1px] after:w-full after:content-normal after:bg-white after:opacity-0 after:transition-opacity hover:after:opacity-100 sm:text-sm"
          href={"/"}
        >
          Scan
          <span className="rounded-full border border-white">
            <IconChevronRight size={16} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HomeBanner;
