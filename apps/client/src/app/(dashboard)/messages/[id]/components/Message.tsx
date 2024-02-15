import React from 'react'
import { ChatEvent } from '../page'
import { auth } from '@skinsight/auth';

interface MessageProps {
  message: ChatEvent;
}

const Message = async ({ message }: MessageProps) => {
  const sessionId = 1;

  const isSender = message.user_id === sessionId ? true : false;

  return (
    <div className={`${isSender ? 'bg-primary text-white' : 'bg-white ml-auto'} relative w-fit border border-gray rounded-lg p-3 mb-12 last-of-type:mb-0`}>
      {message.data}
      <span className='absolute -bottom-7 left-0 text-sm text-gray-strong'>{message.createdAt}</span>
    </div>
  )
}

export default Message
