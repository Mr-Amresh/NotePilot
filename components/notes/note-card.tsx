'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal, Trash, Edit, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Note } from '@/lib/supabase/types';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onGenerateSummary: (id: string, content: string) => void;
}

export function NoteCard({ note, onDelete, onGenerateSummary }: NoteCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  const formattedDate = note.updated_at
    ? formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })
    : 'recently';

  const handleDelete = () => {
    onDelete(note.id);
    setShowDeleteDialog(false);
    toast({
      title: 'Note deleted',
      description: 'Your note was deleted successfully.',
    });
  };

  const handleGenerateSummary = () => {
    onGenerateSummary(note.id, note.content);
    toast({
      title: 'Generating summary',
      description: 'Note Summary is being generated.',
    });
  };

  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return `${content.substring(0, maxLength)}...`;
  };

  return (
    <>
      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="line-clamp-1">{note.title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push(`/notes/${note.id}`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleGenerateSummary}>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Summary
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription className="text-xs">
            Updated {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {truncateContent(note.content)}
          </p>
          {note.summary && (
            <div className="mt-2 p-2 bg-secondary/50 rounded-sm">
              <p className="text-xs text-muted-foreground font-medium">Summary:</p>
              <p className="text-xs line-clamp-2">{note.summary}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full"
            onClick={() => router.push(`/notes/${note.id}`)}
          >
            View Note
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
            <p className="text-sm text-red-600">
  This action is irreversible and will permanently delete your note.
</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}