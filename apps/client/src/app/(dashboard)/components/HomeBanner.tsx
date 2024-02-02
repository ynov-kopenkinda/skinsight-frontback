import { Heading, Text } from '@radix-ui/themes'
import { IconChevronRight } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeBanner = () => {
  return (
    <div className='relative bg-primary rounded-2xl flex gap-x-2 p-6 items-center after:absolute after:left-1/2 after:-bottom-4 after:rounded-2xl after:w-[90%] after:content-normal after:h-full after:bg-primary after:bg-opacity-30 after:-z-10 after:-translate-x-1/2 before:absolute before:left-1/2 before:-bottom-7 before:rounded-2xl before:w-[80%] before:content-normal before:h-full before:bg-primary before:bg-opacity-10 before:-z-20 before:-translate-x-1/2'>
      <div className="flex items-center justify-center basis-1/2 relative">
        <Image className='max-w-full h-auto scale-[1.4] -translate-y-2' src={'/home-doctor.png'} alt='doctor' width={120} height={180} />
      </div>
      <div className="basis-1/2 flex flex-col gap-y-2 text-white">
        <Heading as='h2' className='text-sm'>Simple ways for healthy life</Heading>
        <Text className='text-xs sm:text-sm'>
          Check-up on your health of your skin with a click of a button
        </Text>
        <Link className='mt-2 text-xs sm:text-sm flex gap-x-2 items-center relative w-fit hover:after:opacity-100 after:transition-opacity after:opacity-0 after:absolute after:w-full after:bg-white after:left-0 after:bottom-[-6px] after:h-[1px] after:content-normal' href={'/'}>
          Scan
          <span className='border border-white rounded-full'>
            <IconChevronRight size={16} />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default HomeBanner
