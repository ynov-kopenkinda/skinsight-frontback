'use client'

import React, { useState } from 'react'
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'

const schema = z.object({
  email: z.string().email('Email nécessaire'),
  password: z.string().min(6, { message: 'Mot de passe nécessaire' })
})

type SignUpFormParameters = z.infer<typeof schema>

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormParameters>({ mode: 'onSubmit', resolver: zodResolver(schema) });

  const onSubmit = async (data: SignUpFormParameters) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        })
      });

      if (response.ok) {
        await response.json();
        setIsLoading(false);
        router.push('/onboarding');
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Créer un compte
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
              <Button className="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type='submit' disabled={isLoading}>Créer un compte</Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Déjà un compte ? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Connectez-vous</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
)}

export default SignUpForm
