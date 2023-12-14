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
    <Link href={link} className={`${background ?? 'bg-gray'} rounded-lg flex flex-col`}>
      <span className={`p-2 rounded-lg ${color ?? 'text-primary'}`}>
        {icon}
      </span>
      {label ? (
        <Text>{label}</Text>
      ): null}
    </Link>
  )
}

export default IconButton
