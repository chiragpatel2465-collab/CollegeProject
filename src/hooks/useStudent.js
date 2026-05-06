import { mockStudent } from '../data/mockStudent';

export const useStudentData = () => {
  // TO SWITCH TO API: replace below with -> fetch('/api/student')
  // TO SWITCH TO FIREBASE: replace with -> getDocs(collection(db, 'students'))
  return {
    profile: mockStudent.profile,
    stats: mockStudent.stats,
    notices: mockStudent.notices,
    attendanceDetails : mockStudent.attendanceDetails,
    // Add other properties here as we build them out
  };
};