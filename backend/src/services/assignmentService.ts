import type { Assignment } from '../models/Assignment.js';

const assignmentData: Assignment[] = [
  {
    id: 'assignment-1',
    courseId: 'course-1',
    title: 'Learning Plan',
    dueDate: new Date().toISOString()
  }
];

export const assignments = {
  listByCourse: (courseId: string) =>
    assignmentData.filter((assignment) => assignment.courseId === courseId)
};
