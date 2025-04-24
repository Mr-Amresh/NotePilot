'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NoteCard } from '@/components/notes/note-card';
import { Note } from '@/lib/supabase/types';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onGenerateSummary: (id: string, content: string) => void;
}

export function NoteList({ notes, isLoading, onDelete, onGenerateSummary }: NoteListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        <Button onClick={() => router.push('/notes/new')} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px] rounded-md" />
          ))}
        </div>
      ) : filteredNotes.length > 0 ? (
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={onDelete}
                onGenerateSummary={onGenerateSummary}
              />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
      <p className="text-sm text-muted-foreground mb-4">
  {searchQuery
    ? 'No matching notes found for your search.'
    : "You don't have any notes yet. Start by creating one!"}
</p>

          {!searchQuery && (
            <Button onClick={() => router.push('/notes/new')}>
              Create your first note
            </Button>
          )}
        </div>
      )}
    </div>
  );
}