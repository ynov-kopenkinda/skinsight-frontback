import type { ComponentProps } from "react";
import { forwardRef } from "react";
import Image from "next/image";

import { api } from "~/utils/api/react";

export const S3Image = forwardRef<
  ComponentProps<typeof Image>,
  { s3key: string }
>(function S3Image(props, ref) {
  const imageUrl = api.s3.get.useQuery({ key: props.s3key });
  if (imageUrl.isLoading) {
    return null;
  }
  if (imageUrl.error) {
    return <div>Failed to load image</div>;
  }
  if (!imageUrl.data) {
    return null;
  }
  return (
    <Image {...props} width={400} height={400} src={imageUrl.data} ref={ref} />
  );
});
