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
      <div className="max-w-7xl mx-auto bg-amber-50 px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 hover:shadow-md transition-all">
              <div className="h-1 w-full bg-amber-400" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-1">{course.name}</h3>
                <p className="text-sm text-amber-600 mb-6">Code: {course.code}</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-amber-600">
                    <Clock className="w-4 h-4 mr-3 text-purple-800" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="flex items-center text-amber-600">
                    <Banknote className="w-4 h-4 mr-3 text-purple-800" />
                    <span className="text-sm">{course.tuitionFee}</span>
                  </div>
                  <div className="flex items-center text-amber-600">
                    <Calendar className="w-4 h-4 mr-3 text-purple-800" />
                    <span className="text-sm">{course.intakes.join(' • ')}</span>
                  </div>
                </div>

                <Link 
                  to={`/courses/${course.id}`}
                  className="flex items-center justify-center w-full py-3 bg-purple-700 text-amber-300 rounded-full font-semibold hover:bg-purple-900 transition-colors group"
                >
                  View Course 
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;