'use client'

import Image from 'next/image';
import React from 'react';
import { api } from '~/utils/api/react';
import BoxOptions from './components/box-options';
import { IconDots, IconLock, IconLogout, IconQuestionMark, IconShield, IconUser } from '@tabler/icons-react';

const Profile = () => {
  const user = api.user.getUserById.useQuery({ id: 1 });

  console.log(user.data);

  if (user.isLoading) return <div>Loading...</div>;

  if (!user.data || user.isError || user.error) return <div>Something went wrong</div>;

  if (user.data) {
    return (
      <div>
        <div className="flex gap-x-4 p-4 shadow-lg border border-slate-100 rounded-xl items-center">
          <Image className='rounded-full' src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.data?.firstName}&backgroundColor=B9D8C1`} width={60} height={60} alt={user.data?.firstName ?? 'avatar'} />
          <div className="flex flex-col gap-y-1">
            <p className='text-lg font-semibold'>{user.data.lastName} {user.data.firstName}</p>
            <p className='font-light'>{user.data.email}</p>
          </div>
        </div>

        <div className="flex flex-col pt-4 pb-4 shadow-lg border border-slate-100 rounded-xl mt-8">
          <h2 className='text-gray-strong pl-4 text-xl font-medium pb-2'>General</h2>
          <BoxOptions icon={<IconUser width={24} />} title='Edit profile' subtitle='Change your personal information' link='/profile/edit' />
          <BoxOptions icon={<IconLock width={24} />} title='Change password' subtitle='Update and strengthen account security' link='/profile/change-password' />
          <BoxOptions icon={<IconShield width={24} />} title='Terms of use' subtitle='All informations about your datas.' link='/profile/terms-of-use' />
        </div>

        <div className="flex flex-col pt-4 pb-4 shadow-lg border border-slate-100 rounded-xl mt-8">
          <h2 className='text-gray-strong pl-4 text-xl font-medium pb-2'>Preferences</h2>
          <BoxOptions icon={<IconQuestionMark width={24} />} title='FAQ' subtitle='Any questions you may have' link='/faq' />
          <BoxOptions icon={<IconLogout width={24} />} title='Logout' subtitle='Disconnect from your account' link='/logout' isLogOutButton={true} />
        </div>
      </div>
    );
  }
};

export default Profile;