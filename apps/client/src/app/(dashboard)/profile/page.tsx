'use client'

import Image from 'next/image';
import React from 'react';
import { api } from '~/utils/api/react';

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
      </div>
    );
  }
};

export default Profile;