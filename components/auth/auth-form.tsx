'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address to continue." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(64, { message: "Password cannot exceed 64 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

interface AuthFormProps {
  type: 'login' | 'register';
}

export function AuthForm({ type }: AuthFormProps) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      if (type === 'login') {
        const result = await signIn(values.email, values.password);
        if (result?.error) {
          toast({
            title: 'Error',
            description: result.error,
            variant: 'destructive',
          });
        }
      } else {
        const result = await signUp(values.email, values.password);
        if (result?.error) {
          toast({
            title: 'Error',
            description: result.error,
            variant: 'destructive',
          });
        } else if (result?.success) {
          toast({
            title: 'Account created',
            description: 'Please check your email to verify your account',
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result?.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          {type === 'login' ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="text-muted-foreground">
          {type === 'login' 
            ? 'Enter your credentials to sign in to your account' 
            : 'Enter your information to create an account'}
        </p>
      </div>
      
      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
        {type === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
      </Button>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
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
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              'Loading...'
            ) : type === 'login' ? (
              'Sign in'
            ) : (
              'Create account'
            )}
          </Button>
        </form>
      </Form>
      
      <div className="text-center text-sm">
        {type === 'login' ? (
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-primary underline underline-offset-4">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary underline underline-offset-4">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}