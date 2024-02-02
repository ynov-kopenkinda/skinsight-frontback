'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@radix-ui/themes'
import { toast } from 'sonner'

const schema = z.object({
  email: z.string().email('Email nécessaire'),
  password: z.string().min(6, { message: 'Mot de passe nécessaire' })
})

type SignInFormParameters = z.infer<typeof schema>

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormParameters>({ mode: 'onSubmit', resolver: zodResolver(schema) });

  const onSubmit = async (data: SignInFormParameters) => {
    setIsLoading(true);
    const result = await signIn(
      "credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }
    )

    if (result?.error) {
      setIsLoading(false);
      toast.error('Wrong email or password.');
    } else {
      toast.success('Login successfull!');
      router.push('/');
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Connexion
            </h1>
            <form className='space-y-4' onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(onSubmit)(e)
            }}>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type='email' placeholder='Email' {...register('email')} className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled={isLoading} />
                {errors?.email?.message && <p className='text-red-600 text-sm mt-2'>{errors.email?.message?.toString()}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                <input type='password' placeholder="••••••••" className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' {...register('password')} disabled={isLoading} />
                {errors?.password?.message && <p className='text-red-600 text-sm mt-2'>{errors.password?.message?.toString()}</p>}
              </div>
              <Button className="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type='submit' disabled={isLoading}>Connexion</Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Pas de compte ? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Créer un compte</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
)}

export default SignInForm
