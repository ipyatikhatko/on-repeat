import React from 'react'
import GoogleIcon from '../assets/google-icon.svg'
import { Button } from '@/modules/common/components/ui/button'

export default function GoogleOAuthButton() {
  const handleGoogleLogin = () => {
    // Redirect to the backend's Google OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_HOST}/auth/google`
  }

  return (
    <Button 
      onClick={handleGoogleLogin}
      className='w-full flex items-center justify-center gap-2'
      variant="outline"
    >
      <GoogleIcon className="h-5 w-5" />
      Continue with Google
    </Button>
  )
}
