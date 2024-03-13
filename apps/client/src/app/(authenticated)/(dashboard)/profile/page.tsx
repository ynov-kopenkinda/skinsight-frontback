"use client";

import React from "react";
import Image from "next/image";
import {
  IconLock,
  IconLogout,
  IconQuestionMark,
  IconShield,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";

import { useUser } from "~/shared/hooks/useUser";
import { api } from "~/utils/api/react";
import BoxOptions from "./components/box-options";

const Profile = () => {
  const user = useUser();
  const { data: userData } = api.user.getUserById.useQuery(
    { id: user.data!.id },
    { enabled: !!user.data?.id },
  );

  if (user.isLoading) return <div>Loading...</div>;

  if (!user.data || user.isError) return <div>Something went wrong</div>;

  if (userData) {
    return (
      <div>
        <div className="flex items-center gap-x-4 rounded-xl border border-slate-100 p-4 shadow-lg">
          <Image
            className="rounded-full"
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData.firstName}&backgroundColor=B9D8C1`}
            width={60}
            height={60}
            alt={userData.firstName ?? "avatar"}
          />
          <div className="flex flex-col gap-y-1">
            <p className="text-lg font-semibold">
              {userData.lastName} {userData.firstName}
            </p>
            <p className="font-light">{userData.email}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col rounded-xl border border-slate-100 pb-4 pt-4 shadow-lg">
          <h2 className="text-gray-strong pb-2 pl-4 text-xl font-medium">
            General
          </h2>
          <BoxOptions
            icon={<IconUser width={24} />}
            title="Edit profile"
            subtitle="Change your personal information"
            link="/profile/edit"
          />
          <BoxOptions
            icon={<IconLock width={24} />}
            title="Change password"
            subtitle="Update and strengthen account security"
            link="/profile/change-password"
          />
          <BoxOptions
            icon={<IconShield width={24} />}
            title="Terms of use"
            subtitle="All informations about your datas."
            link="/profile/terms-of-use"
          />
        </div>

        <div className="mt-8 flex flex-col rounded-xl border border-slate-100 pb-4 pt-4 shadow-lg">
          <h2 className="text-gray-strong pb-2 pl-4 text-xl font-medium">
            Preferences
          </h2>
          <BoxOptions
            icon={<IconQuestionMark width={24} />}
            title="FAQ"
            subtitle="Any questions you may have"
            link="/faq"
          />
          <BoxOptions
            icon={<IconLogout width={24} />}
            title="Logout"
            subtitle="Disconnect from your account"
            link="/login"
            isLogOutButton={true}
          />
          <BoxOptions
            icon={<IconTrash width={24} color="#ef4444" />}
            title="Delete account"
            subtitle="Remove your account and the data associated"
            link="/login"
            isDeleteAccountButton={true}
          />
        </div>
      </div>
    );
  }
};

export default Profile;
