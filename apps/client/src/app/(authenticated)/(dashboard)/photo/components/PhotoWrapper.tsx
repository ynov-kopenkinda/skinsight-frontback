"use client";

import type { ChangeEvent } from "react";
import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, Text } from "@radix-ui/themes";
import {
  IconCamera,
  IconFile,
  IconLoader,
  IconRefresh,
  IconReload,
  IconUpload,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import Webcam from "react-webcam";
import { z } from "zod";

import { useUser } from "~/shared/hooks/useUser";
import useWebcam from "~/shared/hooks/useWebcam";
import { api } from "~/utils/api/react";

const sendPreAppointmentSchema = z.object({
  message: z.string().optional(),
  doctorId: z.number(),
  image: z.string(),
});

type SendPreAppointmentFormParameters = z.infer<
  typeof sendPreAppointmentSchema
>;

export async function uploadFile(
  file: File,
  userid: number,
  uploader: ReturnType<typeof api.s3.upload.useMutation>["mutateAsync"],
) {
  const url = await uploader({ userid });
  const result = await fetch(url.url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });
  if (result.ok) {
    return url.key;
  }
  return null;
}

function PhotoWrapper() {
  const user = useUser();
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [facingMode, setFacingMode] = useState("environment");
  const [isFileLoading, setIsFileLoading] = useState(false);
  const { isError, isLoading } = useWebcam();

  const {
    data: doctors,
    isLoading: isDoctorsLoading,
    isError: isDoctorsError,
  } = api.user.getDoctors.useQuery();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode,
  } satisfies MediaTrackConstraints;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SendPreAppointmentFormParameters>({
    mode: "onChange",
    resolver: zodResolver(sendPreAppointmentSchema),
  });

  const { mutateAsync: getUploadUrl } = api.s3.upload.useMutation();

  const { mutateAsync } = api.preAppointment.createPreAppointment.useMutation(
    {},
  );

  const capture = useCallback(async () => {
    if (imgUrl) {
      console.log("toto", imgUrl);
    }

    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc === null) return;

    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      const imageKey = await uploadFile(file, user.data!.id, getUploadUrl);
      console.log("imageKey", imageKey, file);
      if (!imageKey) {
        return;
      }
      setValue("image", imageKey);
    } catch (error) {
      console.error(error);
    }

    setImgUrl(imageSrc);
  }, [imgUrl, user.data, getUploadUrl, setValue]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    setImgUrl("");
    setIsFileLoading(true);
    const imageUrl = URL.createObjectURL(file);
    const imageKey = await uploadFile(file, user.data!.id, getUploadUrl);
    setIsFileLoading(false);
    if (!imageKey) {
      return;
    }
    setValue("image", imageKey);
    setTimeout(() => {
      setImgUrl(imageUrl);
    }, 1000);
  };

  const triggerFileInputClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleImageLoaded = () => {
    setIsFileLoading(false);
  };

  const onSubmit = async (data: SendPreAppointmentFormParameters) => {
    if (!user.data) return;
    await mutateAsync({
      message: data.message ?? "",
      doctorId: data.doctorId,
      patientId: Number(user.data.id),
      image: data.image,
    });

    router.push("/messages/1");
  };

  if (isDoctorsLoading) return <p>Loading...</p>;

  if (isDoctorsError) return <p>Error...</p>;

  return (
    <div>
      <Heading as="h1" className="text-sm" mb="4">
        Take a photo of your skin
      </Heading>
      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit, console.error)(e).catch(console.error);
        }}
      >
        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            A comment about your photo
          </label>
          <textarea
            className="focus:ring-primary-600 focus:border-primary-600 dark:focus:border-primary dark:focus:ring-primary block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
            {...register("message")}
            disabled={isLoading}
          />
          {errors?.message?.message && (
            <p className="mt-2 text-sm text-red-600">
              {errors.message?.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="doctors"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a doctor
          </label>

          <select
            className="focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            {...register("doctorId", { valueAsNumber: true })}
            defaultValue={0}
            disabled={isLoading}
          >
            <option value={0} disabled>
              Select a doctor
            </option>
            {doctors?.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
          {errors?.doctorId?.message && (
            <p className="mt-2 text-sm text-red-600">
              {errors.doctorId?.message?.toString()}
            </p>
          )}
        </div>
        {isError && (
          <Text as="p" mb={"4"}>
            You have to enabled the camera permission or upload a file.
          </Text>
        )}
        {isLoading && <IconLoader size={32} className="animate-spin" />}
        <div className="relative">
          {!imgUrl && !isError && !isLoading && (
            <Webcam
              audio={false}
              className={`${facingMode === "user" ? "-scale-x-100" : ""}`}
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1280}
              videoConstraints={videoConstraints}
            />
          )}
          {imgUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgUrl}
              className={`${facingMode === "user" ? "-scale-x-100" : ""}`}
              onLoad={handleImageLoaded}
              alt="User uploaded file"
            />
          )}
          {isFileLoading && (
            <span
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
            >
              <IconLoader
                color={`${isError || isLoading ? "black" : "white"}`}
                className="animate-spin"
                size={48}
              />
            </span>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          <div
            className={`${
              isError || isLoading
                ? "mt-4"
                : "absolute bottom-2 left-1/2 mt-4 flex w-full -translate-x-1/2 justify-center gap-x-2"
            }`}
          >
            {!imgUrl && (
              <Button type="button" size={"3"} onClick={triggerFileInputClick}>
                <IconFile />
              </Button>
            )}
            {!isError && !isLoading && !imgUrl && (
              <Button type="button" size={"3"} onClick={capture}>
                <IconCamera />
              </Button>
            )}
            {(isError || isLoading) && imgUrl && (
              <Button type="button" size={"3"} onClick={capture}>
                {imgUrl ? <IconUpload /> : <IconCamera />}
              </Button>
            )}
            {imgUrl && (
              <Button
                type="button"
                size={"3"}
                variant="surface"
                className="border border-black"
                onClick={() => setImgUrl("")}
              >
                <IconReload />
              </Button>
            )}
            {!isError && !isLoading && !imgUrl && (
              <Button
                size={"3"}
                onClick={() =>
                  facingMode === "environment"
                    ? setFacingMode("user")
                    : setFacingMode("environment")
                }
              >
                <IconRefresh />
              </Button>
            )}
          </div>
        </div>
        <Button
          type="submit"
          size="3"
          mt={"4"}
          className="mt-6"
          disabled={isLoading}
        >
          Send
        </Button>
      </form>
    </div>
  );
}

export default PhotoWrapper;
