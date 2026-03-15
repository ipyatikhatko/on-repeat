'use client'
import React, { useState } from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { rubikMono } from '@/lib/fonts';
import SignUpModal from '@/modules/auth/modals/sign-up-modal';
import SignInModal from '@/modules/auth/modals/sign-in-modal';

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(prev => !prev);

  return (
    <>
      <Button className='relative z-50' onClick={toggleOpen} variant='ghost' size='icon'>
        <MenuIcon/>
      </Button>
      <nav className={cn(
        "fixed top-0 left-full transition-all opacity-0 grainy-bg before:!opacity-20 bg-background px-6 pb-10 w-[100vw] h-[100dvh] ",
        open && ' -translate-x-full opacity-100'
      )}>
        <div className='h-full flex flex-col relative z-10'>
          <div className='w-fit h-14 flex items-center'>
            <ModeToggle/>
          </div>
          
          <ul className={cn(rubikMono.className, "flex flex-col gap-2 text-2xl mt-10")}>
            <li>
              <Link href='#about'>
                About
              </Link>
            </li>
            <li>
              <Link href='#features'>
                Feautures
              </Link>
            </li>
          </ul>
          
          <div className="flex flex-col gap-4 mt-10">
            <SignUpModal>
              <Button variant='default'>
                Sign Up
              </Button>
            </SignUpModal>
            <SignInModal>
              <Button variant='ghost'>
                Sign In
              </Button>
            </SignInModal>
          </div>
        </div>
      </nav>
    </>  
  )
}
