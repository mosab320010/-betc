
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import type { ChainOfThoughtStruct } from '../../types/btec';

export default function ChainOfThoughtViewer({ chainOfThought }: { chainOfThought: ChainOfThoughtStruct }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>سلسلة التفكير (منظّم)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2 border-r-2 border-zinc-900 pr-2">فهم المهمة</h3>
            <ul className="list-disc pr-5 space-y-1 text-zinc-700">
              {chainOfThought.taskUnderstanding.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2 border-r-2 border-zinc-900 pr-2">تحليل المعايير</h3>
            <div className="space-y-2">
              {Object.entries(chainOfThought.criteriaAnalysis).map(([criterion, analysis]) => (
                <div key={criterion} className="border-r-2 border-zinc-200 pr-3">
                  <p className="font-medium">{criterion}</p>
                  <p className="text-sm text-zinc-600">{analysis}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2 border-r-2 border-zinc-900 pr-2">نقاط القوة والضعف</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-green-700 mb-1">نقاط القوة</h4>
                <ul className="list-disc pr-5 text-sm text-zinc-700">
                  {chainOfThought.strengthsWeaknesses.strengths.map((strength, i) => (
                    <li key={i}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-red-700 mb-1">نقاط الضعف</h4>
                <ul className="list-disc pr-5 text-sm text-zinc-700">
                  {chainOfThought.strengthsWeaknesses.weaknesses.map((weakness, i) => (
                    <li key={i}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2 border-r-2 border-zinc-900 pr-2">التقييم التفصيلي</h3>
            <div className="space-y-2">
              {Object.entries(chainOfThought.scoring).map(([criterion, score]) => (
                <div key={criterion} className="flex justify-between text-sm">
                  <span>{criterion}</span>
                  <span className="font-semibold">{score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
