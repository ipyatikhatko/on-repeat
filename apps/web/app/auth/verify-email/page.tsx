'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CircleCheckBig, CircleXIcon } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import client from '@/lib/api/client';
import Loader from '@/modules/common/components/loader';

export default function VerifyEmailPage() {
  const [success, setSuccess] = useState(false)
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const verifyEmail = useQuery({
    queryKey: ['verify-email', token],
    queryFn: async () => {
      if(!token) throw new Error('No token provided')
      const { error, data } = await client.GET('/auth/verify-email', { params: { query: { token } } })

      if(error) throw error;
      setSuccess(true)
      return data;
    },
    enabled: !!token && !success,
  })

  if(!token) {
    return <div className='h-screen w-full flex flex-col gap-4 items-center justify-center'>
      <CircleXIcon className='text-red-500' size={60}/>
      <span className='text-lg font-semibold'>Invalid link, no token provided</span>
    </div>
  }

  return (
    <div className='h-screen w-full grid place-content-center'>
      {verifyEmail.isPending && <Loader height={50} width={50}/>}
      {verifyEmail.isError && (
        <div className='flex flex-col gap-4 items-center justify-center'>
          <CircleXIcon className='text-red-500' size={60}/>
          <span className='text-lg font-semibold'>Verification failed, invalid token</span>
        </div>
      )}
      {verifyEmail.isSuccess && success && (
        <div className='flex flex-col gap-4 items-center justify-center'>
          <CircleCheckBig className='text-green-500' size={60}/>
          <span className='text-lg font-semibold'>Email verified!</span>
          <Link className='text-2xl font-semibold underline' href='/?action=signIn'>
            Sign in
          </Link>
        </div>
      )}
    </div>
  )
}
