import { Text } from '@radix-ui/themes';
import Link from 'next/link';
import React, { ReactNode } from 'react'

interface IconButtonProps {
  background?: string;
  color?: string;
  label?: string;
  extraStyle?: string;
  icon: ReactNode;
  link: string;
}

const IconButton = ({ background, color, label, extraStyle, icon, link }: IconButtonProps) => {
  return (
    <div className='group'>
      <Link href={link} className='flex flex-col items-center space-y-2'>
        <div className={`${background ?? 'bg-gray'} items-center justify-center w-12 h-12 rounded-lg flex flex-col ${extraStyle ? extraStyle : ''}`}>
          <span className={`p-2 rounded-lg ${color ?? 'text-primary'}`}>
            {icon}
          </span>
        </div>
        {label ? (
          <Text className='text-gray-strong group-hover:text-black transition-all'>{label}</Text>
        ): null}
      </Link>
    </div>
  )
}

export default IconButton
