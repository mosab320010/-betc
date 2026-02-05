import React from 'react';
import { Layout } from './components/common/Layout';
import { StudentDashboard } from './components/dashboard/StudentDashboard';

export const App = () => {
  return (
    <Layout>
      <StudentDashboard />
    </Layout>
  );
};
