'use client'

import { IconCamera, IconMessageCircle, IconSearch, IconUserCircle } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

const TopMenu = () => {
  return (
    <div className="flex items-center space-x-1">
      <Link href='/search' className='hover:opacity-60 transition-all p-2'>
        <IconSearch size={24} />
      </Link>
      <Link href='/photo' className='hover:opacity-60 transition-all p-2'>
        <IconCamera size={24} />
      </Link>
      <Link href='/messages' className='hover:opacity-60 transition-all p-2'>
        <IconMessageCircle size={24} />
      </Link>
      <Link href='/profile' className='hover:opacity-60 transition-all p-2'>
        <IconUserCircle size={24} />
      </Link>
    </div>
  )
}

export default TopMenu
