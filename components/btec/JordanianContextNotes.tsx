
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export default function JordanianContextNotes({ notes }: { notes: string[] }) {
  if (notes.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>ملاحظات سياق الأردن</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pr-5 space-y-1 text-zinc-700">
          {notes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
