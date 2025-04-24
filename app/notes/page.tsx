'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useNotes } from '@/hooks/use-notes';
import { NoteList } from '@/components/notes/note-list';

export default function NotesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const {
    notes,
    isLoading: isLoadingNotes,
    deleteNote,
    generateSummary,
  } = useNotes(user?.id);
  
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
  
  return (
    <div className="container max-w-5xl py-8">
      <NoteList
        notes={notes}
        isLoading={isLoadingNotes}
        onDelete={deleteNote}
        onGenerateSummary={(id, content) => generateSummary({ id, content })}
      />
    </div>
  );
}