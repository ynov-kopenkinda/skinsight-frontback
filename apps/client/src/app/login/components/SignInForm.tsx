"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Email nécessaire"),
  password: z.string().min(6, { message: "Mot de passe nécessaire" }),
});

type SignInFormParameters = z.infer<typeof schema>;

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormParameters>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignInFormParameters) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setIsLoading(false);
      toast.error("Wrong email or password.");
    } else {
      toast.success("Login successfull!");
      router.push("/");
    }
  };

  return (
    <section className="dark:bg-gray-900">
      <div className="w-full rounded-lg bg-white dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className="p-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Login into your account
          </h1>
          <Text as="p" mt={"2"} mb={"4"} className="text-gray-strong text-sm">
            Hello, you must login first to be able to use the application and
            enjoy all the features
          </Text>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit(onSubmit)(e);
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                disabled={isLoading}
              />
              {errors?.email?.message && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                {...register("password")}
                disabled={isLoading}
              />
              {errors?.password?.message && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password?.message?.toString()}
                </p>
              )}
            </div>
            <Button
              className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              type="submit"
              disabled={isLoading}
            >
              Connexion
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account ?{" "}
              <Link
                href="/register"
                className="text-primary dark:text-primary-500 font-medium hover:underline"
              >
                Join us
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
