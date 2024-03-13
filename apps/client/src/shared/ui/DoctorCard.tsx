"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { IconClockHour4, IconStar } from "@tabler/icons-react";

import type { Doctor } from "~/app/(authenticated)/(dashboard)/components/RecommandedDoctor";

export interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className="mb-6 rounded-xl border border-slate-100 p-4 shadow-lg last-of-type:mb-0 md:mb-0">
      <div className="flex shrink-0 gap-x-4">
        <div className="bg-green overflow-hidden rounded-xl">
          <Image
            src={
              doctor.imageSrc !== ""
                ? doctor.imageSrc
                : `https://api.dicebear.com/7.x/initials/svg?seed=${doctor.name}&backgroundColor=B9D8C1`
            }
            width={100}
            height={100}
            alt={doctor.name}
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <p className="mb-2 text-lg font-bold">Dr. {doctor.name}</p>
          <p className="text-gray-strong">{doctor.job}</p>
          <div className="mt-auto flex items-center justify-between">
            {doctor.rating ? (
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-[#feebd8] p-[.375rem]">
                  <IconStar strokeWidth={0} fill="#f89d3d" size={14} />
                </div>
                <span className="text-xs font-medium">{doctor.rating}</span>
              </div>
            ) : null}
            <div className="ml-auto flex items-center space-x-2">
              <div className="rounded-full bg-[#DBFAE3] p-[.375rem]">
                <IconClockHour4 color="#30D058" size={14} />
              </div>
              <span className="text-xs font-medium">
                {doctor.schedule_start} - {doctor.schedule_end}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link className="block w-full" href={`/messages/${doctor.id}`}>
          <Button size={"4"} className="w-full hover:cursor-pointer">
            Messages
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
