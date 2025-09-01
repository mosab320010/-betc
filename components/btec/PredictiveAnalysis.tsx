
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { Badge } from '../ui/Badge';
import type { EvaluationResult } from '../../types/btec';

export default function PredictiveAnalysis({ analysis }: { analysis: EvaluationResult['predictiveAnalysis'] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>التحليل التنبؤي</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-1 text-sm font-medium">
            <span>مستوى الثقة في التقييم</span>
            <span>{(analysis.confidence * 100).toFixed(0)}%</span>
          </div>
          <Progress value={analysis.confidence * 100} />
        </div>
        
        <div>
          <h3 className="font-medium mb-2">التوصيات</h3>
          <ul className="list-disc pr-5 space-y-1 text-zinc-700">
            {analysis.recommendations.map((recommendation, i) => (
              <li key={i}>{recommendation}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">مسار التعلم المقترح</h3>
          <div className="space-y-2">
            {analysis.learningPath.map((step, i) => (
              <div key={i} className="flex items-start">
                <Badge variant="outline" className="ml-2 mt-0.5">{i + 1}</Badge>
                <span className="text-zinc-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
