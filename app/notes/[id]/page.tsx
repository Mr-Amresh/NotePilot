'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useNotes, useNote } from '@/hooks/use-notes';
import { NoteEditor } from '@/components/notes/note-editor';

export default function EditNotePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const noteId = params?.id as string;
  
  const { data: note, isLoading: isLoadingNote } = useNote(noteId);
  const {
    updateNote,
    isUpdating,
    generateSummary,
    isGeneratingSummary,
  } = useNotes(user?.id);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  if (loading || !user || isLoadingNote) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!note) {
    return (
      <div className="container max-w-3xl py-8">
        <h1 className="text-2xl font-bold mb-4">Note not found</h1>
        <p className="text-sm text-gray-600">
  The note you're trying to access either doesn't exist or you do not have the necessary permissions to view it.
</p>

      </div>
    );
  }
  
  const handleSave = ({ title, content }: { title: string; content: string }) => {
    updateNote({
      id: noteId,
      note: {
        title,
        content,
      },
    });
  };
  
  const handleGenerateSummary = (id: string, content: string) => {
    generateSummary({ id, content });
  };
  
  return (
    <div className="container max-w-3xl py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Note</h1>
      <NoteEditor
        note={note}
        userId={user.id}
        onSave={handleSave}
        onGenerateSummary={handleGenerateSummary}
        isGeneratingSummary={isGeneratingSummary}
      />
    </div>
  );
}