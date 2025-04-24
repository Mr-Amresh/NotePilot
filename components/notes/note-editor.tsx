'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SaveIcon, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Note } from '@/lib/supabase/types';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
});

type FormValues = z.infer<typeof formSchema>;

interface NoteEditorProps {
  note?: Note;
  userId: string;
  onSave: (values: FormValues & { id?: string }) => void;
  onGenerateSummary?: (id: string, content: string) => void;
  isGeneratingSummary?: boolean;
}

export function NoteEditor({
  note,
  userId,
  onSave,
  onGenerateSummary,
  isGeneratingSummary,
}: NoteEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const isEditMode = !!note;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note?.title || '',
      content: note?.content || '',
    },
  });

  useEffect(() => {
    if (note) {
      form.reset({
        title: note.title,
        content: note.content,
      });
    }
  }, [form, note]);

  async function onSubmit(values: FormValues) {
    setIsSaving(true);
    try {
      onSave({
        id: note?.id,
        ...values,
      });
      
      toast({
        title: isEditMode ? 'Note Updated' : 'Note Created',
        description: isEditMode
          ? 'Your note was updated successfully.'
          : 'Your new note has been created successfully.',
      });
      
      
      if (!isEditMode) {
        router.push('/notes');
      }
    } catch (error) {
      toast({
        title: 'An Error Occurred',
        description: 'We encountered an issue. Please try again shortly.',
        variant: 'destructive',
      });
      
    } finally {
      setIsSaving(false);
    }
  }

  const handleGenerateSummary = () => {
    if (note && onGenerateSummary) {
      onGenerateSummary(note.id, form.getValues('content'));
      toast({
        title: 'Generating summary',
        description: 'Note summary is being generated...',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/notes')}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Notes
        </Button>
        
        {isEditMode && onGenerateSummary && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary}
            className="flex items-center gap-1"
          >
            <Sparkles className="h-4 w-4" />
            {isGeneratingSummary ? 'Generating...' : 'Generate Summary'}
          </Button>
        )}
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Note title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your note content here..."
                    className="min-h-[300px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {note?.summary && (
            <div className="p-4 bg-secondary/50 rounded-md space-y-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
  <Sparkles className="w-5 h-5 text-blue-600 animate-bounce" />
  <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
    Your Summarized Notes
  </span>
</h3>

              <p className="text-sm text-muted-foreground">{note.summary}</p>
            </div>
          )}
          
          <Button type="submit" disabled={isSaving} className="flex items-center gap-1">
            <SaveIcon className="h-4 w-4" />
            {isSaving ? 'Saving...' : isEditMode ? 'Update Note' : 'Save Note'}
          </Button>
        </form>
      </Form>
    </div>
  );
}