import type { Course } from '../models/Course.js';

const courseData: Course[] = [
  {
    id: 'course-1',
    title: 'Intro to BTEC',
    description: 'Foundations of BTEC learning paths.',
    instructorId: 'teacher-1',
    status: 'published'
  }
];

export const courses = {
  list: () => courseData,
  get: (id: string) => courseData.find((course) => course.id === id) ?? null
};
