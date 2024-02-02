import { IconFile, IconMessageCircle, IconReload, IconSearch } from '@tabler/icons-react'
import React from 'react'
import IconButton from '~/shared/ui/IconButton'

const Nav = () => {
  return (
    <div className='flex gap-x-6 sm:gap-x-12 mt-12 justify-center'>
      <IconButton icon={<IconSearch size={20} />} link='/search' label='Find doctor' />
      <IconButton icon={<IconReload size={20} />} link='/history' label='History' />
      <IconButton icon={<IconFile size={20} />} link='/analyses' label='Analyses' />
      <IconButton icon={<IconMessageCircle size={20} />} link='/messages' label='Messages' />
    </div>
  )
}

export default Nav
