'use client';

import { useAuth } from '@/hooks/use-auth';
import { AuthForm } from '@/components/auth/auth-form';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (user && !loading) {
      router.push('/notes');
    }
  }, [user, loading, router]);
  
  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <AuthForm type="register" />
    </div>
  );
}