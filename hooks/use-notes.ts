'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, getNoteById, createNote, updateNote, deleteNote, generateNoteSummary } from '@/lib/api/notes';
import { InsertNote, UpdateNote, Note } from '@/lib/supabase/types';

export function useNotes(userId: string | undefined) {
  const queryClient = useQueryClient();
  
  const notesQuery = useQuery({
    queryKey: ['notes', userId],
    queryFn: () => userId ? getNotes(userId) : Promise.resolve([]),
    enabled: !!userId,
  });
  
  const createNoteMutation = useMutation({
    mutationFn: (newNote: InsertNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', userId] });
    },
  });
  
  const updateNoteMutation = useMutation({
    mutationFn: ({ id, note }: { id: string; note: UpdateNote }) => updateNote(id, note),
    onSuccess: (updatedNote) => {
      queryClient.invalidateQueries({ queryKey: ['notes', userId] });
      queryClient.invalidateQueries({ queryKey: ['note', updatedNote.id] });
    },
  });
  
  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', userId] });
    },
  });
  
  const generateSummaryMutation = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) => 
      generateNoteSummary(id, content),
    onSuccess: (updatedNote) => {
      queryClient.invalidateQueries({ queryKey: ['notes', userId] });
      queryClient.invalidateQueries({ queryKey: ['note', updatedNote.id] });
    },
  });
  
  return {
    notes: notesQuery.data || [],
    isLoading: notesQuery.isLoading,
    isError: notesQuery.isError,
    error: notesQuery.error,
    createNote: createNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    generateSummary: generateSummaryMutation.mutate,
    isCreating: createNoteMutation.isPending,
    isUpdating: updateNoteMutation.isPending,
    isDeleting: deleteNoteMutation.isPending,
    isGeneratingSummary: generateSummaryMutation.isPending,
  };
}

export function useNote(id: string | undefined) {
  return useQuery({
    queryKey: ['note', id],
    queryFn: () => id ? getNoteById(id) : Promise.resolve(null),
    enabled: !!id,
  });
}