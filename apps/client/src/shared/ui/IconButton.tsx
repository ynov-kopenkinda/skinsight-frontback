import { Text } from '@radix-ui/themes';
import Link from 'next/link';
import React, { ReactNode } from 'react'

interface IconButtonProps {
  background?: string;
  color?: string;
  label?: string;
  icon: ReactNode;
  link: string;
}

const IconButton = ({ background, color, label, icon, link }: IconButtonProps) => {
  return (
    <div className='flex flex-col gap-y-2 items-center'>
      <Link href={link} className={`${background ?? 'bg-gray'} items-center justify-center w-12 h-12 rounded-lg flex flex-col`}>
        <span className={`p-2 rounded-lg ${color ?? 'text-primary'}`}>
          {icon}
        </span>
      </Link>
      {label ? (
        <Text className='text-gray-strong'>{label}</Text>
      ): null}
    </div>
  )
}

export default IconButton
