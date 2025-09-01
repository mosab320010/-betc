
import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import { Button } from '../ui/Button';
import { EvaluationResult } from '../../types/btec';
import { ensureArabicPdfFont } from '../../utils/pdfUtils';

interface ExportPDFButtonProps {
  result: EvaluationResult;
}

export default function ExportPDFButton({ result }: ExportPDFButtonProps) {

  const handleExport = async () => {
    await ensureArabicPdfFont();
    
    const docDefinition: any = {
      content: [
        { text: 'تقرير تقييم BTEC (AAQ 2025)', style: 'header', alignment: 'right' },
        { text: `الطالب: ${result.studentName}`, alignment: 'right', margin: [0, 5, 0, 0] },
        { text: `المهمة: ${result.taskId}`, alignment: 'right' },
        { text: `التاريخ: ${new Date(result.timestamp).toLocaleString('ar-JO')}`, alignment: 'right' },
        { text: `الإصدار: ${result.version}`, alignment: 'right', margin: [0, 0, 0, 10] },
        { text: `النتيجة: ${result.score}/100 — ${result.isPass ? 'ناجح' : 'راسب'}`, bold: true, alignment: 'right', margin: [0, 5, 0, 5] },
        { text: `التغذية الراجعة: ${result.feedback}`, alignment: 'right', margin: [0, 0, 0, 15] },
        
        { text: 'فحص الانتحال:', style: 'subheader', alignment: 'right' },
        { text: `درجة التشابه: ${result.plagiarismCheck.similarityScore}% — ${result.plagiarismCheck.isPlagiarized ? 'يحتاج مراجعة' : 'آمن'}`, alignment: 'right' },
        { text: 'المصادر:', alignment: 'right', italics: true, margin: [0, 2, 0, 0] },
        { ul: result.plagiarismCheck.sources.map(s => ({ text: s, alignment: 'left', direction: 'ltr' })), alignment: 'right', margin: [0, 0, 0, 15] },
        
        { text: 'سلسلة التفكير (منظّم):', style: 'subheader', alignment: 'right' },
        { ul: result.chainOfThought.taskUnderstanding, alignment: 'right', margin: [0, 0, 0, 10] },
        
        { text: 'تحليل المعايير:', style: 'subheader', alignment: 'right' },
        { ul: Object.entries(result.chainOfThought.criteriaAnalysis).map(([k, v]) => `${k}: ${v}`), alignment: 'right', margin: [0, 0, 0, 10] },
        
        { text: 'نقاط القوة والضعف:', style: 'subheader', alignment: 'right' },
        {
            columns: [
                { width: '*', text: '' },
                {
                    width: 'auto',
                    ul: result.chainOfThought.strengthsWeaknesses.weaknesses.map(w => `الضعف: ${w}`) , alignment: 'right'
                },
                {
                    width: 'auto',
                    ul: result.chainOfThought.strengthsWeaknesses.strengths.map(s => `القوة: ${s}`) , alignment: 'right'
                }
            ],
            columnGap: 10,
            margin: [0,0,0,15]
        },

        { text: 'التحليل التنبؤي:', style: 'subheader', alignment: 'right' },
        { text: `مستوى الثقة: ${(result.predictiveAnalysis.confidence * 100).toFixed(0)}%`, alignment: 'right' },
        { text: 'التوصيات:', alignment: 'right', italics: true, margin: [0, 2, 0, 0] },
        { ul: result.predictiveAnalysis.recommendations, alignment: 'right', margin: [0, 0, 0, 10] },
        
        { text: 'مسار التعلم المقترح:', style: 'subheader', alignment: 'right' },
        { ul: result.predictiveAnalysis.learningPath, alignment: 'right', margin: [0, 0, 0, 15] },

        { text: 'ملاحظات سياق الأردن:', style: 'subheader', alignment: 'right' },
        { ul: result.jordanianContextNotes, alignment: 'right', margin: [0, 0, 0, 20] },
        
        { text: `ختم التجزئة: ${result.hash}`, style: 'footer', alignment: 'right' },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        footer: { fontSize: 8, italics: true, color: 'grey' },
      },
      defaultStyle: {
        font: 'Cairo',
      }
    };
    
    pdfMake.createPdf(docDefinition).download(`BTEC_Report_${result.studentName.replace(' ', '_')}_${result.taskId}.pdf`);
  };

  return (
    <Button variant="outline" onClick={handleExport}>
      📄 تصدير PDF
    </Button>
  );
}
