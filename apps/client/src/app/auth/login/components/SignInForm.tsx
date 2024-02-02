"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";
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
  const [step, isStep] = useState(1);
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

  const onSubmitRegister = async (data: SignInFormParameters) => {
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
    <section className="bg-gray-50 dark:bg-gray-900">
      <div
        id="stepper-progress"
        className={clsx(
          "bg-primary shadow-primary fixed left-0 top-0 h-1 shadow-md",
          {
            "w-1/3": step === 1,
            "w-2/3": step === 2,
            "w-full": step === 3,
          },
        )}
      />
      {step === 1 && (
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmitRegister)}
        ></form>
      )}
    </section>
  );

  // <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
  //             <div>
  //               <label
  //                 htmlFor="email"
  //                 className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
  //               >
  //                 Email
  //               </label>
  //               <input
  //                 type="email"
  //                 placeholder="Email"
  //                 {...register("email")}
  //                 className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
  //                 disabled={isLoading}
  //               />
  //               {errors?.email?.message && (
  //                 <p className="mt-2 text-sm text-red-600">
  //                   {errors.email?.message?.toString()}
  //                 </p>
  //               )}
  //             </div>
  //             <div>
  //               <label
  //                 htmlFor="password"
  //                 className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
  //               >
  //                 Mot de passe
  //               </label>
  //               <input
  //                 type="password"
  //                 placeholder="••••••••"
  //                 className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
  //                 {...register("password")}
  //                 disabled={isLoading}
  //               />
  //               {errors?.password?.message && (
  //                 <p className="mt-2 text-sm text-red-600">
  //                   {errors.password?.message?.toString()}
  //                 </p>
  //               )}
  //             </div>
  //             <Button
  //               className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
  //               type="submit"
  //               disabled={isLoading}
  //             >
  //               Connexion
  //             </Button>
  //             <p className="text-sm font-light text-gray-500 dark:text-gray-400">
  //               Pas de compte ?{" "}
  //               <Link
  //                 href="/register"
  //                 className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
  //               >
  //                 Créer un compte
  //               </Link>
  //             </p>
  //           </form>
};

export default SignInForm;
