import { IconChevronRight } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import type { ReactNode } from 'react';
import IconButton from '~/shared/ui/IconButton';

interface BoxOptionsProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  link: string;
  isLogOutButton?: boolean;
}

const BoxOptions = ({ icon, title, subtitle, link, isLogOutButton }: BoxOptionsProps) => {

  return (
    <div className='flex items-center gap-x-4 w-full relative p-4 group z-10'>
      <IconButton icon={icon} link='#' iconFullRounded={true} extraStyle='rounded-full' background={isLogOutButton ? 'bg-red-50' : 'bg-gray'} color={isLogOutButton ? 'text-red-500' : 'text-primary'} />
      <div className="flex flex-col gap-y-1">
        <p className={`font-semibold ${isLogOutButton ? 'text-red-500' : null}`}>{title}</p>
        <p className='text-sm font-light text-gray-strong'>{subtitle}</p>
      </div>
      {isLogOutButton ?
        <Link onClick={async () => await signOut()} className='smooth-transition ml-auto after:content-normal after:w-full after:z-20 after:h-full after:top-0 after:left-0 after:absolute before:content-normal before:absolute before:top-0 before:left-0 before:w-full before:bg-transparent before:hover:-z-10 before:h-full before:hover:bg-slate-50' href={link}><IconChevronRight color='#8A8A8E' /></Link>
      :
        <Link className='smooth-transition ml-auto after:content-normal after:w-full after:z-20 after:h-full after:top-0 after:left-0 after:absolute before:content-normal before:absolute before:top-0 before:left-0 before:w-full before:bg-transparent before:hover:-z-10 before:h-full before:hover:bg-slate-50' href={link}><IconChevronRight color='#8A8A8E' /></Link>
      }
    </div>
  )
}

export default BoxOptions
