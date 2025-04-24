'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useNotes } from '@/hooks/use-notes';
import { NoteEditor } from '@/components/notes/note-editor';

export default function NewNotePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const { createNote, isCreating } = useNotes(user?.id);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  const handleSave = ({ title, content }: { title: string; content: string }) => {
    createNote({
      title,
      content,
      user_id: user.id,
    });
  };
  
  return (
    <div className="container max-w-3xl py-8">
      <h1 className="text-2xl font-bold mb-6">Add Your Note</h1>
      <NoteEditor
        userId={user.id}
        onSave={handleSave}
      />
    </div>
  );
}