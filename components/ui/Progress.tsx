
import React from 'react';

export function Progress({ value }: { value: number }) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-200">
      <div
        className="h-full w-full flex-1 bg-zinc-900 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}
