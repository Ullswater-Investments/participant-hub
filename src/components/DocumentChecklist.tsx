import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Upload, CheckCircle2, Clock, FileCheck, ChevronDown, MessageSquare, ExternalLink, Info } from 'lucide-react';
import { DocumentDefinition } from '@/data/documentDefinitions';
import { Document, useUploadDocument, useUpdateDocumentNotes } from '@/hooks/useDocuments';
import { supabase } from '@/integrations/supabase/client';

interface Props {
  definition: DocumentDefinition;
  document?: Document;
  participantId: number | null;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: 'Pendiente', icon: <Clock className="w-3 h-3" />, variant: 'destructive' },
  uploaded: { label: 'Subido', icon: <Upload className="w-3 h-3" />, variant: 'secondary' },
  verified: { label: 'Verificado', icon: <CheckCircle2 className="w-3 h-3" />, variant: 'default' },
};

export function DocumentChecklist({ definition, document, participantId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState(document?.notes || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadDocument();
  const notesMutation = useUpdateDocumentNotes();

  const status = document?.status || 'pending';
  const config = statusConfig[status];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadMutation.mutate({
      file,
      participantId,
      documentKey: definition.key,
      documentName: definition.name,
      category: definition.category,
    });
  };

  const handleSaveNotes = () => {
    if (document) {
      notesMutation.mutate({ documentId: document.id, notes });
    }
  };

  const handleDownload = async () => {
    if (!document?.file_path) return;
    const { data } = supabase.storage.from('documents').getPublicUrl(document.file_path);
    window.open(data.publicUrl, '_blank');
  };

  return (
    <Card className="border-l-4" style={{ borderLeftColor: status === 'verified' ? 'hsl(var(--success))' : status === 'uploaded' ? 'hsl(var(--warning))' : 'hsl(var(--destructive))' }}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardContent className="pt-4 pb-4 cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-medium text-sm">{definition.name}</h4>
                  <Badge variant={config.variant} className="text-xs gap-1">
                    {config.icon}
                    {config.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{definition.description}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CardContent>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-6 pb-4 space-y-4 border-t pt-4">
            {/* Guide */}
            <div className="bg-primary/5 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/80">{definition.guide}</p>
              </div>
            </div>

            {/* File upload */}
            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                className="hidden"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadMutation.isPending}
              >
                <Upload className="w-4 h-4 mr-1" />
                {uploadMutation.isPending ? 'Subiendo...' : 'Subir archivo'}
              </Button>

              {document?.file_name && (
                <Button size="sm" variant="ghost" onClick={handleDownload}>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  {document.file_name}
                </Button>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                Notas / Comentarios
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Añade notas o comentarios sobre este documento..."
                className="text-sm min-h-[60px]"
              />
              {notes !== (document?.notes || '') && (
                <Button size="sm" variant="secondary" onClick={handleSaveNotes}>
                  Guardar notas
                </Button>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
