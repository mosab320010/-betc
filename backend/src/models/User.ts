export type User = {
  id: string;
  email: string;
  displayName: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
};
