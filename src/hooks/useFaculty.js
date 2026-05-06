import { mockFaculty } from '../data/mockFaculty';

export const useFacultyData = () => {
  // Swap point for Faculty API/Firebase
  return {
    profile: mockFaculty.profile,
    stats: mockFaculty.stats,
    notices: mockFaculty.notices,
    studentsList : mockFaculty.studentsList,
  };
};