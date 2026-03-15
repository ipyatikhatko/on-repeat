'use client'
import ResponsiveDialog from '@/modules/common/components/responsive-dialog'
import EmailSignupForm from '@/modules/auth/components/email-signup-form'
import React, { ReactNode, useState } from 'react'
import { ArrowLeft, CheckCircleIcon, CircleXIcon } from 'lucide-react';
import { Button } from '@/modules/common/components/ui/button';
import { DialogProps } from '@radix-ui/react-dialog';
import GoogleOAuthButton from '../components/google-oauth-button';

interface Props extends DialogProps {
  children: ReactNode
}

export default function SignUpModal(props: Props) {
  const { children, ...rest } = props;
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState('');

  const handleSuccess = () => {
    setVerificationSent(true)
  }

  const handleError = (message: string) => {
    setError(message)
  }

  const handleReset = () => {
    setError('');
    setVerificationSent(false);
  }

  return (
    <ResponsiveDialog 
      {...rest}
      trigger={children}
      title='Sign Up'
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
      {verificationSent && (
        <div className='flex flex-col items-center justify-center gap-4'>
          <CheckCircleIcon size={50} className='text-green-500'/>
          <span className='text-lg text-center font-bold'>Verification link has been sent to your email.</span>
        </div>
      )}
      {!error && !verificationSent && <EmailSignupForm onError={handleError} onSuccess={handleSuccess}/>}
      <hr className='my-4'/>
      <GoogleOAuthButton />
    </ResponsiveDialog>
  )
}
