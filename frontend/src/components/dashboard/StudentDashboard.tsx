import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';

export const StudentDashboard = () => {
  const { userId } = useAuthStore();

  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">Student Dashboard</h2>
      <p className="text-slate-600">Track courses, assignments, and progress.</p>
      <p className="text-sm text-slate-500">Active learner: {userId ?? 'Guest'}</p>
    </section>
  );
};
