import type { ComponentProps, ComponentRef } from "react";
import { forwardRef } from "react";
import Image from "next/image";

import { api } from "~/utils/api/react";

export const S3Image = forwardRef<
  ComponentRef<typeof Image>,
  Omit<ComponentProps<typeof Image>, "alt" | "src"> & {
    s3key: string;
    src?: string;
    alt?: string;
  }
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
    <Image
      {...props}
      width={props.width ?? 400}
      height={props.height ?? 400}
      src={imageUrl.data}
      alt={props.alt ?? `Image ${props.s3key}`}
      ref={ref}
    />
  );
});
