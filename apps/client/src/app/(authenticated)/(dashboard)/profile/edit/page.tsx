"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "~/utils/api/react";

const updateUserSchema = z.object({
  id: z.number(),
  requestBody: z.object({
    email: z.string().email("Email needed"),
    password: z.string().min(6, { message: "Password needed" }),
    firstName: z.string().min(2, { message: "Firstname needed" }),
    lastName: z.string().min(2, { message: "Lastname needed" }),
    phone: z.string().min(10, { message: "Phone number needed" }),
    heightInCm: z.number().min(100, { message: "Height needed" }),
    weightInKg: z.number().min(20, { message: "Weight needed" }),
    ssn: z.string(),
    proDoctorNumber: z.string(),
  }),
});

type EditProfileFormParameters = z.infer<typeof updateUserSchema>;

function EditProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const user = api.user.getUserById.useQuery({ id: 1 });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProfileFormParameters>({
    mode: "onSubmit",
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: 1,
      requestBody: {
        email: user.data?.email,
        firstName: user.data?.firstName,
        lastName: user.data?.lastName,
        phone: user.data?.phone,
        heightInCm: user.data?.heightInCm,
        weightInKg: user.data?.weightInKg,
        password: user.data?.password,
        ssn: user.data?.ssn,
        proDoctorNumber: user.data?.proDoctorNumber,
      },
    },
  });

  useEffect(() => {
    if (user.data === undefined) return;
    setValue("requestBody.ssn", user.data.ssn);
    setValue("requestBody.proDoctorNumber", user.data.proDoctorNumber);
  }, [user.data, setValue]);

  const { mutateAsync } = api.user.updateUserById.useMutation({});

  const onSubmit = async (data: EditProfileFormParameters) => {
    setIsLoading(true);
    const result = await mutateAsync(data);
    console.log("result", result);
  };

  if (!user.data || user.isError || user.error)
    return <div>Something went wrong</div>;

  return (
    <div>
      <div className="mb-10 flex items-center justify-center rounded-full">
        <Image
          className="rounded-full"
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.data?.firstName}&backgroundColor=B9D8C1`}
          width={150}
          height={150}
          alt={user.data?.firstName ?? "avatar"}
        />
      </div>
      <form
        className=""
        onSubmit={(e) => {
          console.log(errors);
          handleSubmit(onSubmit, console.error)(e).catch(console.error);
        }}
      >
        <div className="mb-4 flex flex-col">
          <label htmlFor="firstname" className="mb-1 text-lg font-light">
            Firstname
          </label>
          <input
            type="text"
            defaultValue={user.data?.firstName}
            {...register("requestBody.firstName")}
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            disabled={isLoading}
          />
          {errors?.requestBody?.firstName?.message && (
            <p className="mt-2 text-sm text-red-600">
              {errors.requestBody.firstName.message.toString()}
            </p>
          )}
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="lastname" className="mb-1 text-lg font-light">
            Lastname
          </label>
          <input
            type="text"
            defaultValue={user.data?.lastName}
            {...register("requestBody.lastName")}
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            disabled={isLoading}
          />
          {errors?.requestBody?.lastName?.message && (
            <p className="mt-2 text-sm text-red-600">
              {errors.requestBody.lastName.message.toString()}
            </p>
          )}
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email" className="mb-1 text-lg font-light">
            Email
          </label>
          <input
            type="text"
            defaultValue={user.data?.email}
            {...register("requestBody.email")}
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            disabled={isLoading}
          />
          {errors?.requestBody?.email?.message && (
            <p className="mt-2 text-sm text-red-600">
              {errors.requestBody.email.message.toString()}
            </p>
          )}
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="phone" className="mb-1 text-lg font-light">
            Phone
          </label>
          <input
            type="text"
            defaultValue={user.data?.phone}
            {...register("requestBody.phone")}
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            disabled={isLoading}
          />
          {errors?.requestBody?.phone?.message && (
            <p className="mt-2 text-sm text-red-600">
              {errors.requestBody.phone.message.toString()}
            </p>
          )}
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="lastname" className="mb-1 text-lg font-light">
            Height
          </label>
          <input
            type="number"
            defaultValue={user.data?.heightInCm}
            {...register("requestBody.heightInCm", { valueAsNumber: true })}
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            disabled={isLoading}
          />
          {errors?.requestBody?.heightInCm?.message && (
            <p className="mt-2 text-sm text-red-600">
              {errors.requestBody.heightInCm.message.toString()}
            </p>
          )}
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="lastname" className="mb-1 text-lg font-light">
            Weight
          </label>
          <input
            type="text"
            defaultValue={user.data?.weightInKg}
            {...register("requestBody.weightInKg", { valueAsNumber: true })}
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            disabled={isLoading}
          />
          {errors?.requestBody?.weightInKg?.message && (
            <p className="mt-2 text-sm text-red-600">
              {errors.requestBody.weightInKg.message.toString()}
            </p>
          )}
        </div>
        <Button
          type="submit"
          size={"4"}
          className="w-full hover:cursor-pointer"
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default EditProfilePage;