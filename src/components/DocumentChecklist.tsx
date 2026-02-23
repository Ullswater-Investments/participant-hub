import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Upload, CheckCircle2, Clock, ChevronDown, MessageSquare, ExternalLink, Info, FileText, Trash2 } from 'lucide-react';
import { DocumentDefinition } from '@/data/documentDefinitions';
import { Document, useUploadDocument, useDeleteDocument } from '@/hooks/useDocuments';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  definition: DocumentDefinition;
  documents: Document[];
  participantId: number | null;
}

export function DocumentChecklist({ definition, documents, participantId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadDocument();
  const deleteMutation = useDeleteDocument();
  const { t, tDoc } = useLanguage();

  const hasFiles = documents.length > 0;
  const hasVerified = documents.some((d) => d.status === 'verified');
  const status = hasVerified ? 'verified' : hasFiles ? 'uploaded' : 'pending';

  const statusConfig: Record<string, { label: string; icon: React.ReactNode; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    pending: { label: t('documents.pending') as string, icon: <Clock className="w-3 h-3" />, variant: 'destructive' },
    uploaded: { label: t('documents.uploaded') as string, icon: <Upload className="w-3 h-3" />, variant: 'secondary' },
    verified: { label: t('documents.verified') as string, icon: <CheckCircle2 className="w-3 h-3" />, variant: 'default' },
  };

  const config = statusConfig[status];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    uploadMutation.mutate({
      files: Array.from(fileList),
      participantId,
      documentKey: definition.key,
      documentName: tDoc(definition.name),
      category: definition.category,
    });
    // Reset input so the same file can be re-selected
    e.target.value = '';
  };

  const handleDownload = async (filePath: string) => {
    const { data } = await supabase.storage.from('documents').createSignedUrl(filePath, 3600);
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  };

  return (
    <Card className="border-l-4" style={{ borderLeftColor: status === 'verified' ? 'hsl(var(--success))' : status === 'uploaded' ? 'hsl(var(--warning))' : 'hsl(var(--destructive))' }}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardContent className="pt-4 pb-4 px-3 sm:px-6 cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-medium text-sm">{tDoc(definition.name)}</h4>
                  <Badge variant={config.variant} className="text-xs gap-1">
                    {config.icon}
                    {config.label}
                  </Badge>
                  {documents.length > 0 && (
                    <span className="text-xs text-muted-foreground">({documents.length} archivo{documents.length !== 1 ? 's' : ''})</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{tDoc(definition.description)}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CardContent>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-3 sm:px-6 pb-4 space-y-4 border-t pt-4">
            <div className="bg-primary/5 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/80">{tDoc(definition.guide)}</p>
              </div>
            </div>

            {/* Upload button */}
            <div>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" className="hidden" multiple />
              <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploadMutation.isPending}>
                <Upload className="w-4 h-4 mr-1" />
                {uploadMutation.isPending ? t('documents.uploading') as string : t('documents.uploadFile') as string}
              </Button>
            </div>

            {/* List of uploaded files */}
            {documents.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">Archivos subidos:</p>
                <ul className="space-y-1">
                  {documents.map((doc) => (
                    <li key={doc.id} className="flex items-center gap-2 text-sm bg-muted/40 rounded-md px-2.5 py-1.5">
                      <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                      <button
                        onClick={() => doc.file_path && handleDownload(doc.file_path)}
                        className="text-left truncate flex-1 text-primary hover:underline text-xs sm:text-sm"
                      >
                        {doc.file_name || doc.document_key}
                      </button>
                      <Badge variant={doc.status === 'verified' ? 'default' : 'secondary'} className="text-[10px] shrink-0">
                        {doc.status === 'verified' ? '✓' : '↑'}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
