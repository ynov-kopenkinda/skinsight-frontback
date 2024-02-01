'use client'

import { IconCamera, IconMessageCircle, IconSearch, IconUserCircle } from '@tabler/icons-react'
import { IconHome } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import IconButton from '~/shared/ui/IconButton'

const TapBar= () => {
  const currentRoute = usePathname();

  return (
    <div className='flex p-2 gap-x-4 items-center justify-center'>
      <IconButton icon={<IconHome />} link='/' background={`${currentRoute === '/' ? 'bg-primary' : 'bg-transparent'}`} color={`${currentRoute === '/' ? 'text-white' : 'text-gray-strong'}`} extraStyle={`${currentRoute === '/' ? 'shadow-lg shadow-[#737ae0]' : ''}`} />
      <IconButton icon={<IconSearch />} link='/search' background={`${currentRoute === '/search' ? 'bg-primary' : 'bg-transparent'}`} color={`${currentRoute === '/search' ? 'text-white' : 'text-gray-strong'}`} extraStyle={`${currentRoute === '/search' ? 'shadow-xl shadow-[#737ae0]' : ''}`} />
      <IconButton icon={<IconCamera />} link='/photo' background={`${currentRoute === '/photo' ? 'bg-primary' : 'bg-transparent'}`} color={`${currentRoute === '/photo' ? 'text-white' : 'text-gray-strong'}`} extraStyle={`${currentRoute === '/photo' ? 'shadow-xl shadow-[#737ae0]' : ''}`} />
      <IconButton icon={<IconMessageCircle />} link='/messages' background={`${currentRoute === '/messages' ? 'bg-primary' : 'bg-transparent'}`} color={`${currentRoute === '/messages' ? 'text-white' : 'text-gray-strong'}`} extraStyle={`${currentRoute === '/messages' ? 'shadow-xl shadow-[#737ae0]' : ''}`} />
      <IconButton icon={<IconUserCircle />} link='/profile' background={`${currentRoute === '/profile' ? 'bg-primary' : 'bg-transparent'}`} color={`${currentRoute === '/profile' ? 'text-white' : 'text-gray-strong'}`} extraStyle={`${currentRoute === '/profile' ? 'shadow-xl shadow-[#737ae0]' : ''}`} />
    </div>
  )
}

export default TapBar
