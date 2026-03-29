import React, { useEffect } from 'react';
import { Layout } from './components/common/Layout';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { useAuthStore } from './stores/useAuthStore';

export const App = () => {
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    setSession('demo-student', 'student');
  }, [setSession]);

  return (
    <Layout>
      <StudentDashboard />
    </Layout>
  );
};
