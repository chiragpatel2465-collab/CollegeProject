import { mockCourses } from "../data/mockCourses";

export const useCourses = () => {
  return { courses: mockCourses };
};

export const useCourseDetail = (id) => {
  return { course: mockCourses.find((c) => c.id === id) };
};