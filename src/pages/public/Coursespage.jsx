import React from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../../hooks/useCourses';
import { Clock, Banknote, Calendar, ArrowRight } from 'lucide-react';

const CoursesPage = () => {
  const { courses } = useCourses();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Banner */}
      <div className="bg-purple-900 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-amber-400 mb-4">Explore Our Courses</h1>
          <p className="text-amber-200 text-lg">Find the right programme to shape your future</p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto bg-purple-50 px-4 py-12">
       <CourseGrid courses={courses} />
      </div>
    </div>
  );
};

export function CourseGrid({ courses }) {
  return (
    <div className="w-full mx-auto my-5 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <div key={course.id} className="flex-1 bg-white h-[350px] rounded-2xl shadow-sm overflow-hidden border-t border-t-yellow-500 border-t-4 hover:shadow-md transition-all">
         
         
          <div className="px-3 mt-5 flex flex-col h-full">
            <div className='flex flex-col gap-0 my-auto'>
            <h3 className="w-full text-2xl  font-serif font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-900  to-yellow-500 mb-1">{course.name}</h3>
            <p className="text-md font-sans text-yellow-500 font-bold mb-6">Code: {course.code}</p>
            </div>

            <div className="my-auto space-y-3 mb-8 text-purple-900">
              <div className="flex items-center ">
                <Clock className="w-4 h-4 mr-3 text-yellow-500" />
                <span className="text-lg">{course.duration}</span>
              </div>
              <div className="flex items-center ">
                <Banknote className="w-4 h-4 mr-3 text-yellow-500" />
                <span className="text-lg">{course.tuitionFee}</span>
              </div>
              <div className="flex items-center ">
                <Calendar className="w-4 h-4 mr-3 text-yellow-500" />
                <span className="text-lg">{course.intakes.join(' • ')}</span>
              </div>
            </div>

            <Link
              to={`/courses/${course.id}`}
              className="flex items-center justify-center w-full mt-auto mb-10 py-3 bg-linear-to-r from-purple-900 via-purple-700 to-yellow-500 text-white rounded-full font-semibold hover:bg-purple-900 transition-colors group"
            >
              View Course
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CoursesPage;