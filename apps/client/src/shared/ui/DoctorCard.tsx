'use client'

import { Button } from '@radix-ui/themes';
import { IconClockHour4, IconStar, IconStarFilled } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Doctor } from '~/app/(dashboard)/components/RecommandedDoctor';

export interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className='p-4 shadow-lg rounded-xl mb-6 last-of-type:mb-0 md:mb-0'>
      <div className='flex gap-x-4 shrink-0'>
        <div className='bg-green rounded-xl overflow-hidden'>
          <Image src={doctor.imageSrc !== '' ? doctor.imageSrc : `https://api.dicebear.com/7.x/initials/svg?seed=${doctor.name}&backgroundColor=B9D8C1`} width={100} height={100} alt={doctor.name} loading='lazy' />
        </div>
        <div className='flex flex-col flex-1'>
          <p className='font-bold text-lg mb-2'>Dr. {doctor.name}</p>
          <p className='text-gray-strong'>{doctor.job}</p>
          <div className='flex justify-between items-center mt-auto'>
            {doctor.rating ? (
              <div className='flex space-x-2 items-center'>
                <div className='rounded-full p-[.375rem] bg-[#feebd8]'>
                  <IconStar strokeWidth={0} fill='#f89d3d' size={14} />
                </div>
                <span className='text-xs font-medium'>{doctor.rating}</span>
              </div>
            ): null}
            <div className='flex space-x-2 items-center ml-auto'>
              <div className='rounded-full p-[.375rem] bg-[#DBFAE3]'>
                <IconClockHour4 color='#30D058' size={14} />
              </div>
              <span className='text-xs font-medium'>{doctor.schedule_start} - {doctor.schedule_end}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <Link className='block w-full' href={`/messages/${doctor.id}`}>
          <Button size={'4'} className='w-full'>Messages</Button>
        </Link>
      </div>
    </div>
  )
}

export default DoctorCard
