import React from 'react';

export const ErrorAlert: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      {message}
    </div>
  );
};
