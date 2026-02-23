import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { participantDocuments, commonDocuments } from '@/data/documentDefinitions';

interface DocRow {
  participant_id: number | null;
  document_key: string;
  document_name: string;
  status: string;
  category: string;
}

const STATUS_LABELS: Record<string, Record<string, string>> = {
  es: { pending: 'Pendiente', uploaded: 'Subido', verified: 'Verificado' },
  en: { pending: 'Pending', uploaded: 'Uploaded', verified: 'Verified' },
};

export function exportProgressPDF(
  allDocs: DocRow[],
  language: 'es' | 'en',
  participantIds: number[] = [1, 2, 3, 4, 5]
) {
  const doc = new jsPDF();
  const isEs = language === 'es';
  const totalPerParticipant = participantDocuments.length;

  // Title
  doc.setFontSize(18);
  doc.setTextColor(40, 60, 120);
  doc.text('European Youth Together 2026', 14, 20);
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(isEs ? 'Resumen del progreso de documentación del consorcio' : 'Consortium documentation progress report', 14, 28);
  doc.text(`ERASMUS-YOUTH-2026-YOUTH-TOG  •  ${isEs ? 'Plazo' : 'Deadline'}: 26/02/2026`, 14, 34);
  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(`${isEs ? 'Generado el' : 'Generated on'}: ${new Date().toLocaleDateString(language)}`, 14, 40);

  let y = 48;

  // Summary table
  doc.setFontSize(13);
  doc.setTextColor(40, 60, 120);
  doc.text(isEs ? 'Resumen por participante' : 'Summary by participant', 14, y);
  y += 4;

  const summaryRows = participantIds.map((pid) => {
    const docs = allDocs.filter((d) => d.participant_id === pid);
    const uploaded = docs.filter((d) => d.status === 'uploaded').length;
    const verified = docs.filter((d) => d.status === 'verified').length;
    const pending = totalPerParticipant - uploaded - verified;
    const pct = totalPerParticipant > 0 ? Math.round(((uploaded + verified) / totalPerParticipant) * 100) : 0;
    return [
      `${isEs ? 'Participante' : 'Participant'} ${pid}`,
      String(pending),
      String(uploaded),
      String(verified),
      `${pct}%`,
    ];
  });

  autoTable(doc, {
    startY: y,
    head: [[
      isEs ? 'Participante' : 'Participant',
      isEs ? 'Pendientes' : 'Pending',
      isEs ? 'Subidos' : 'Uploaded',
      isEs ? 'Verificados' : 'Verified',
      isEs ? 'Progreso' : 'Progress',
    ]],
    body: summaryRows,
    theme: 'grid',
    headStyles: { fillColor: [40, 60, 120], fontSize: 9 },
    bodyStyles: { fontSize: 8 },
    margin: { left: 14 },
  });

  y = (doc as any).lastAutoTable.finalY + 12;

  // Detail per participant
  participantIds.forEach((pid) => {
    if (y > 250) { doc.addPage(); y = 20; }

    doc.setFontSize(11);
    doc.setTextColor(40, 60, 120);
    doc.text(`${isEs ? 'Participante' : 'Participant'} ${pid}`, 14, y);
    y += 4;

    const rows = participantDocuments.map((def) => {
      const found = allDocs.find((d) => d.participant_id === pid && d.document_key === def.key);
      const status = found?.status || 'pending';
      return [
        def.name[language],
        def.category === 'administrative' ? (isEs ? 'Admin.' : 'Admin.') : (isEs ? 'Técnica' : 'Technical'),
        STATUS_LABELS[language][status] || status,
      ];
    });

    autoTable(doc, {
      startY: y,
      head: [[
        isEs ? 'Documento' : 'Document',
        isEs ? 'Categoría' : 'Category',
        isEs ? 'Estado' : 'Status',
      ]],
      body: rows,
      theme: 'striped',
      headStyles: { fillColor: [40, 60, 120], fontSize: 8 },
      bodyStyles: { fontSize: 7 },
      margin: { left: 14 },
      columnStyles: {
        2: {
          cellWidth: 30,
          halign: 'center',
        },
      },
    });

    y = (doc as any).lastAutoTable.finalY + 10;
  });

  // Common folder
  if (y > 240) { doc.addPage(); y = 20; }
  doc.setFontSize(11);
  doc.setTextColor(40, 60, 120);
  doc.text(isEs ? 'Carpeta común' : 'Common folder', 14, y);
  y += 4;

  const commonRows = commonDocuments.map((def) => {
    const found = allDocs.find((d) => d.participant_id === null && d.document_key === def.key);
    const status = found?.status || 'pending';
    return [
      def.name[language],
      STATUS_LABELS[language][status] || status,
    ];
  });

  autoTable(doc, {
    startY: y,
    head: [[isEs ? 'Documento' : 'Document', isEs ? 'Estado' : 'Status']],
    body: commonRows,
    theme: 'striped',
    headStyles: { fillColor: [40, 60, 120], fontSize: 8 },
    bodyStyles: { fontSize: 7 },
    margin: { left: 14 },
  });

  doc.save(`Youth-Together-2026-Progress-${new Date().toISOString().slice(0, 10)}.pdf`);
}
