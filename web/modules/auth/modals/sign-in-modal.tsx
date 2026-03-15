'use client'
import ResponsiveDialog from '@/modules/common/components/responsive-dialog'
import React, { ReactNode, useState } from 'react'
import { ArrowLeft, CircleXIcon } from 'lucide-react';
import { Button } from '@/modules/common/components/ui/button';
import EmailSignInForm from '../components/email-signin-form';
import { DialogProps } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import GoogleOAuthButton from '../components/google-oauth-button';

interface Props extends DialogProps {
  children: ReactNode
}

export default function SignInModal(props: Props) {
  const { children, ...rest } = props;
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/feed')
  }

  const handleError = (message: string) => {
    setError(message)
  }

  const handleReset = () => {
    setError('');
  }

  return (
    <ResponsiveDialog 
      {...rest}
      trigger={children}
      title='Sign In'
      description=''
    >
      {!!error && (
        <div className='flex flex-col items-center justify-center gap-4'>
          <CircleXIcon size={50} className='text-red-500'/>
          <span className='text-lg text-center font-bold'>{error}</span>
          <Button onClick={handleReset}>
            <ArrowLeft/>
            Back
          </Button>
        </div>
      )}
      {!error && <EmailSignInForm onError={handleError} onSuccess={handleSuccess}/>}
      <hr className='my-4'/>
      <GoogleOAuthButton />
    </ResponsiveDialog>
  )
}
