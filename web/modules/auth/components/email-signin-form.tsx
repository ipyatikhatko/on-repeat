"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/modules/common/components/ui/button"
import {
  Form,
  FormControl,
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
  email: z.string().email(),
  password: z.string().min(8),
})

interface Props {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default function EmailSignInForm(props: Props) {
  const { onSuccess, onError } = props;

  const signInWithEmail = useMutation({
    mutationFn: async (variables: { email: string, password: string }) => {
      const { data, error } = await client.POST(
        '/auth/signin', { 
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
    disabled: signInWithEmail.isPending,
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })



  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    signInWithEmail.mutateAsync({ email, password })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
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
        
        <Button disabled={signInWithEmail.isPending} className='w-full'>
          {signInWithEmail.isPending ? <Loader/> : 'Sign In'}
        </Button>
      </form>
    </Form>
  )
}
