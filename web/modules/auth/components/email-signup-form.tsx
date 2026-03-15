"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/modules/common/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/common/components/ui/form"
import { Input } from "@/modules/common/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import client from "@/lib/api/client"
import Loader from "@/modules/common/components/loader"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  repeatPassword: z.string().min(8),
}).refine(({ password, repeatPassword }) => password === repeatPassword, {
  message: "Passwords don't match",
  path: ["repeatPassword"],
});

interface Props {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default function EmailSignupForm(props: Props) {
  const { onSuccess, onError } = props;

  const signUpWithEmail = useMutation({
    mutationFn: async (variables: { username: string; email: string, password: string }) => {
      const { data, error } = await client.POST(
        '/auth/signup', { 
          body: variables, 
          credentials: 'include',
        }
      )
      if(error) throw error;
      return data;
    },
    onError: (err) => onError(err.message),
    onSuccess,
  })
  
  const form = useForm<z.infer<typeof formSchema>>({
    disabled: signUpWithEmail.isPending,
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  })



  function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, email, password } = values;
    signUpWithEmail.mutateAsync({ username, email, password })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormDescription>
                Will be used for verification and notifications about your account
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Repeat password above" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button disabled={signUpWithEmail.isPending} className='w-full'>
          {signUpWithEmail.isPending ? <Loader/> : 'Sign Up'}
        </Button>
      </form>
    </Form>
  )
}
