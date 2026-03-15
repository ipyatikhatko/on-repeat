'use client'
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/modules/common/components/mode-toggle";
import { Button } from "@/modules/common/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import BurgerMenu from "@/modules/common/components/burger-menu";
import { rubik80s, rubikGlitch, rubikMono } from "@/lib/fonts";
import SignUpModal from "@/modules/auth/modals/sign-up-modal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SignInModal from "@/modules/auth/modals/sign-in-modal";
import { useToast } from "@/hooks/use-toast";



export default function Home() {
  const { toast } = useToast();
  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const searchParams = useSearchParams();
  const actionParam = searchParams.get('action')
  const status = searchParams.get('status')

  useEffect(() => {
    if(status && status === '401') {
      toast({
        title: 'Unauthorized',
        description: 'session expired, please, sign in',
        variant: 'destructive',
      })
      
    }
  }, [status])


  useEffect(() => {
    switch (actionParam) {
      case 'signIn': {
        setOpenSignIn(true)
        break;
      }
      case 'signUp': {
        setOpenSignUp(true)
        break;
      }
    }
  }, [actionParam])


  return (
    <>
      <header className="fixed z-50 top-0 left-0 w-full h-14">
        <nav className="mx-auto my-0 max-w-screen-lg px-6 flex items-center w-full h-full justify-between">
          <div className="flex">
            <span className="font-extrabold leading-tight text-lg">OnRepeat</span>
            <ul className="ml-20 hidden md:flex items-center gap-2">
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
          </div>
          <div className="hidden md:flex items-center gap-4">
            <SignUpModal open={openSignUp} onOpenChange={setOpenSignUp}>
              <Button variant='default'>
                Sign Up
              </Button>
            </SignUpModal>
            <SignInModal open={openSignIn} onOpenChange={setOpenSignIn}>
              <Button variant='ghost'>
                Sign In
              </Button>
            </SignInModal>
            <ModeToggle/>
          </div>
          <div className="md:hidden">
            <BurgerMenu/>
          </div>
        </nav>
      </header>
      <main className="grainy-bg">
        {/* HERO */}
        <section className="h-[100dvh] flex items-center relative z-10">
          <div className="mx-auto my-0 max-w-screen-lg px-6">
            <div className="space-y-3">
              <h1 className={cn(rubik80s.className, "uppercase text-5xl font-extrabold tracking-tighter leading-10 sm:text-6xl md:text-7xl")}>
                Unite with Music Creators.
              </h1>
              <h1 className={cn(rubikGlitch.className, "uppercase text-opacity-50 text-5xl font-extrabold tracking-tighter leading-10 sm:text-6xl md:text-7xl")}>
                Share, Inspire, Create.
              </h1>
              <h1 className={cn(rubikMono.className, "text-5xl font-extrabold tracking-tighter leading-7 sm:text-6xl md:text-7xl")}>
              Repeat 𝄇
              </h1>
            </div>
            
            
            <p className="mt-6 text-lg md:text-xl max-w-xl leading-5">
              Discover a community designed for artists, producers, and music lovers. Share your beats, explore fresh sounds, and find inspiration from a global network of creators.
            </p>
            <Image src='/synth.svg' alt="synth" className="hidden scale-75 md:block lg:scale-100 float-end rotate-45" width={350} height={100}/>
            <div className="mt-8 flex flex-col md:flex-row max-w-xs justify-start gap-4">
              <SignUpModal>
                <Button size='lg'>
                  Join the Community
                </Button>
              </SignUpModal>
              <SignUpModal>
                <Button variant='link' size='lg'>
                  Listen to Fresh Beats
                </Button>
              </SignUpModal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
