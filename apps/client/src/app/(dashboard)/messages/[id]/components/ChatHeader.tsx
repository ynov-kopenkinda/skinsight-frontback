'use client'

import { Button } from '@radix-ui/themes'
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'
import React from 'react'

interface ChatHeaderProps {
  receptor: string;
}

const ChatHeader = ({ receptor }: ChatHeaderProps) => {
  const router = useRouter();

  return (
    <div className='flex items-center text-white mb-16 relative after:absolute after:content-normal after:left-[-20%] after:w-[130%] after:h-[330%] after:bg-primary after:top-[-32px] after:-z-10'>
      <Button className='hover:cursor-pointer' variant='ghost' onClick={() => router.push('/messages')}>
        <IconArrowLeft color='white' />
      </Button>
      <span className='ml-auto mr-auto text-lg font-bold'>{receptor}</span>
    </div>
  )
}

export default ChatHeader
