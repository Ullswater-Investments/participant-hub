import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Document {
  id: string;
  participant_id: number | null;
  document_key: string;
  document_name: string;
  category: string;
  status: string;
  file_path: string | null;
  file_name: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export function useDocuments(participantId?: number) {
  return useQuery({
    queryKey: ['documents', participantId],
    queryFn: async () => {
      let query = supabase.from('documents').select('*');
      if (participantId !== undefined) {
        query = query.eq('participant_id', participantId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as Document[];
    },
  });
}

export function useAllDocuments() {
  return useQuery({
    queryKey: ['documents', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase.from('documents').select('*');
      if (error) throw error;
      return (data || []) as Document[];
    },
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      files,
      participantId,
      documentKey,
      documentName,
      category,
    }: {
      files: File[];
      participantId: number | null;
      documentKey: string;
      documentName: string;
      category: string;
    }) => {
      for (const file of files) {
        const folder = participantId ? `participant-${participantId}` : 'common';
        const filePath = `${folder}/${documentKey}/${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { error } = await supabase.from('documents').insert({
          participant_id: participantId,
          document_key: documentKey,
          document_name: documentName,
          category,
          file_path: filePath,
          file_name: file.name,
          status: 'uploaded',
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Documento(s) subido(s) correctamente');
    },
    onError: (error) => {
      toast.error('Error al subir el documento: ' + error.message);
    },
  });
}

export function useUpdateDocumentNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ documentId, notes }: { documentId: string; notes: string }) => {
      const { error } = await supabase
        .from('documents')
        .update({ notes })
        .eq('id', documentId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}
