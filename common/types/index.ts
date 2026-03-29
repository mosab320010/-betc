export type UserRole = 'student' | 'teacher' | 'admin' | 'parent';

export type User = {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
};

export type Course = {
  id: string;
  title: string;
  description?: string;
  instructorId: string;
  status: 'draft' | 'published' | 'archived';
};

export type Assignment = {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  rubric?: string;
};

export type Enrollment = {
  id: string;
  courseId: string;
  studentId: string;
  status: 'active' | 'completed' | 'withdrawn';
};
