
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { Badge } from '../ui/Badge';
import type { Criteria, TaskSubmission, EvaluationResult } from '../../types/btec';
import FeedbackPanel from './FeedbackPanel';
import ChainOfThoughtViewer from './ChainOfThoughtViewer';
import PredictiveAnalysis from './PredictiveAnalysis';
import JordanianContextNotes from './JordanianContextNotes';
import ExportPDFButton from './ExportPDFButton';
import { generateSha256Hash } from '../../utils/pdfUtils';

const initialCriteria: Criteria[] = [
    { id: 'P1', description: 'وصف المشكلة بشكل واضح', level: 'P', weight: 30 },
    { id: 'M1', description: 'تحليل أسباب المشكلة', level: 'M', weight: 30 },
    { id: 'D1', description: 'تقديم حلول مبتكرة', level: 'D', weight: 40 }
];

const mockApiCall = async (submission: TaskSubmission): Promise<EvaluationResult> => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    const score = Math.min(100, Math.max(0, 60 + Math.round(Math.random() * 35)));
    const isPass = score >= 50;

    const partialResult = {
      taskId: submission.taskId,
      studentName: submission.studentName,
      score,
      isPass,
      feedback: isPass ? 'أداء جيد مع فرص تحسين في التوثيق وربط الأدلة بالمعايير بشكل أقوى.' : 'نوصي بإعادة صياغة الأقسام الأساسية وإضافة أدلة أكثر قوة لدعم المطالبات الواردة في المهمة.',
      plagiarismCheck: { 
        similarityScore: Math.round(Math.random() * 18), 
        sources: ['https://example.com/source-1'], 
        isPlagiarized: false 
      },
      chainOfThought: {
        taskUnderstanding: ['تحديد نواتج التعلم المطلوبة من دليل الوحدة.', 'مواءمة محتوى المهمة المقدمة مع المعايير P1, M1, D1.'],
        criteriaAnalysis: Object.fromEntries(submission.criteria.map(c => [c.id, `تم تقييم تحقيق المعيار بناءً على الأدلة المقدمة.`])),
        strengthsWeaknesses: { 
          strengths: ['تحليل منهجي للمشكلة.', 'بنية واضحة ومنطقية للنص.'], 
          weaknesses: ['ضعف في الاستشهادات الأكاديمية.', 'الأدلة المقدمة لا تغطي جميع جوانب المعيار D1.'] 
        },
        scoring: Object.fromEntries(submission.criteria.map(c => [c.id, Math.round(score * (Math.random() * 0.5 + 0.75) * (c.weight / 100))]))
      },
      predictiveAnalysis: { 
        confidence: 0.82 + Math.random() * 0.15, 
        recommendations: ['تعزيز المراجع الأكاديمية.', 'تحسين جودة الأدلة المرئية وربطها بالمعايير.'], 
        learningPath: ['مراجعة دليل Pearson AAQ 2025.', 'حضور ورشة عمل عن الكتابة الأكاديمية والتوثيق.'] 
      },
      jordanianContextNotes: ['التقييم يتوافق مع متطلبات التقييم الداخلي المعتمدة.', 'العمل المقدم ملائم لإرشادات المدارس الثانوية المهنية في الأردن.'],
      timestamp: new Date(),
      version: 'AAQ-2025'
    };
    
    const hashableContent = JSON.stringify({ 
      taskId: partialResult.taskId, 
      studentName: partialResult.studentName, 
      score: partialResult.score, 
      version: partialResult.version, 
      timestamp: partialResult.timestamp 
    });
    
    const hash = await generateSha256Hash(hashableContent);

    return { ...partialResult, hash };
};


export default function BTECTaskEvaluator() {
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [taskId, setTaskId] = useState<number>(1);
  const [studentName, setStudentName] = useState<string>('');
  const [taskContent, setTaskContent] = useState<string>('');
  const [evidenceUrls, setEvidenceUrls] = useState<string>('');
  const [criteria] = useState<Criteria[]>(initialCriteria);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !taskContent.trim()) {
      setError('اسم الطالب ونص المهمة حقول مطلوبة.');
      return;
    }

    const submission: TaskSubmission = {
      taskId,
      studentName,
      taskContent,
      evidenceUrls: evidenceUrls.split('\n').filter(url => url.trim()),
      criteria
    };
    
    setIsLoading(true);
    setError(null);
    setEvaluationResult(null);

    try {
      const result = await mockApiCall(submission);
      setEvaluationResult(result);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع أثناء التقييم.');
    } finally {
      setIsLoading(false);
    }
  }, [taskId, studentName, taskContent, evidenceUrls, criteria]);

  const handleReset = useCallback(() => {
    setEvaluationResult(null);
    setIsLoading(false);
    setError(null);
    setTaskId(1);
    setStudentName('');
    setTaskContent('');
    setEvidenceUrls('');
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">مقيّم مهام BTEC</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taskId">رقم المهمة</Label>
                <Input id="taskId" type="number" value={taskId} onChange={(e) => setTaskId(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentName">اسم الطالب</Label>
                <Input id="studentName" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="أدخل اسم الطالب" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="taskContent">نص المهمة</Label>
              <Textarea id="taskContent" value={taskContent} onChange={(e) => setTaskContent(e.target.value)} placeholder="أدخل نص المهمة المقدمة من الطالب" rows={6} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="evidenceUrls">روابط الأدلة (كل رابط في سطر)</Label>
              <Textarea id="evidenceUrls" value={evidenceUrls} onChange={(e) => setEvidenceUrls(e.target.value)} placeholder="https://example.com/evidence1&#10;https://example.com/evidence2" rows={3} />
            </div>
            
            <div className="space-y-2">
              <Label>المعايير</Label>
              <div className="space-y-2 mt-2">
                {criteria.map((criterion) => (
                  <div key={criterion.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                    <div>
                      <Badge>{criterion.id}</Badge>
                      <span className="mr-3">{criterion.description}</span>
                    </div>
                    <div className="text-sm text-zinc-500 font-mono">
                      {criterion.level} - {criterion.weight}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {error && (
              <div className="text-red-600 p-3 bg-red-50 rounded-lg text-sm">{error}</div>
            )}
            
            <div className="flex space-x-2 rtl:space-x-reverse pt-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'جاري التقييم...' : 'قيّم المهمة'}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                إعادة تعيين
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="text-center p-8 space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 mx-auto"></div>
            <p className="text-zinc-600">يتم تحليل المهمة، قد يستغرق هذا بعض الوقت...</p>
        </div>
      )}

      {evaluationResult && !isLoading && (
        <div className="space-y-6">
          <FeedbackPanel result={evaluationResult} />
          <ChainOfThoughtViewer chainOfThought={evaluationResult.chainOfThought} />
          <PredictiveAnalysis analysis={evaluationResult.predictiveAnalysis} />
          <JordanianContextNotes notes={evaluationResult.jordanianContextNotes} />
          <div className="flex justify-end">
            <ExportPDFButton result={evaluationResult} />
          </div>
        </div>
      )}
    </div>
  );
}
