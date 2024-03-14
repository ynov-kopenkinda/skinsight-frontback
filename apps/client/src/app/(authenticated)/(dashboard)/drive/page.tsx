"use client";

import React from "react";

import { useUser } from "~/shared/hooks/useUser";
import { S3Image } from "~/shared/ui/S3Image";
import { api } from "~/utils/api/react";

function Drive() {
  const user = useUser();
  const dataUser = api.chatEvent.getImageSendByUserId.useQuery(
    { userId: user.data!.id },
    { enabled: !!user.data?.id },
  );

  if (!dataUser.data) {
    return null;
  }

  return (
    <div>
      {dataUser.data.map((image) => (
        <S3Image key={image.id} s3key={image.data} />
      ))}
    </div>
  );
}

export default Drive;
