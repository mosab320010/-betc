
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import type { EvaluationResult } from '../../types/btec';

export default function FeedbackPanel({ result }: { result: EvaluationResult }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>نتيجة التقييم</span>
          <Badge variant={result.isPass ? 'default' : 'outline'}>
            {result.isPass ? 'ناجح' : 'راسب'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1 text-sm font-medium">
            <span>الدرجة</span>
            <span>{result.score}/100</span>
          </div>
          <Progress value={result.score} />
        </div>
        
        <div>
          <h3 className="font-medium mb-2">التغذية الراجعة</h3>
          <p className="text-zinc-700 bg-gray-50 p-3 rounded-md">{result.feedback}</p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">فحص الانتحال</h3>
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
            <span>نسبة التشابه:</span>
            <span className="font-semibold">{result.plagiarismCheck.similarityScore}%</span>
            <Badge variant={result.plagiarismCheck.isPlagiarized ? 'outline' : 'default'}>
              {result.plagiarismCheck.isPlagiarized ? 'يحتاج مراجعة' : 'آمن'}
            </Badge>
          </div>
          {result.plagiarismCheck.sources.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mt-2">المصادر:</h4>
              <ul className="list-disc pr-5 text-sm text-zinc-600">
                {result.plagiarismCheck.sources.map((source, i) => (
                  <li key={i}>
                    <a href={source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="text-xs text-zinc-500 border-t pt-4 mt-4 break-all">
          <p><span className='font-semibold'>ختم التجزئة:</span> {result.hash}</p>
          <p><span className='font-semibold'>التاريخ:</span> {new Date(result.timestamp).toLocaleString('ar-JO')}</p>
          <p><span className='font-semibold'>الإصدار:</span> {result.version}</p>
        </div>
      </CardContent>
    </Card>
  );
}
