import { IconSearch } from '@tabler/icons-react'
import React from 'react'
import IconButton from 'shared/ui/IconButton'

const Nav = () => {
  return (
    <div className='flex gap-x-2 mt-12'>
      <IconButton icon={<IconSearch size={20} />} link='/' label='Find doctor' />
    </div>
  )
}

export default Nav
