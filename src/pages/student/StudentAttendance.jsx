import React from 'react';
import { useStudentData } from '../../hooks/useStudent';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle } from 'lucide-react';

export default function StudentAttendance() {
  const { stats, attendanceDetails } = useStudentData();
  const overall = stats.attendance;

  // Data for Recharts Donut
  const donutData = [
    { name: 'Attended', value: overall },
    { name: 'Missed', value: 100 - overall }
  ];
  const COLORS = ['#4F46E5', '#F1F5F9'];

  // Calculate if any subject is below 75%
  const lowAttendanceSubjects = attendanceDetails.filter(s => (s.attended / s.total) * 100 < 75);

  const getBarColor = (percentage) => {
    if (percentage >= 75) return 'bg-emerald-500';
    if (percentage >= 60) return 'bg-amber-400';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      {lowAttendanceSubjects.length > 0 && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start space-x-3 text-red-700">
          <AlertTriangle className="shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold">Attendance Warning</h4>
            <p className="text-sm mt-1 text-red-600">You are falling below the 75% threshold in {lowAttendanceSubjects.length} subject(s).</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Overall Donut Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center md:col-span-1">
          <h2 className="text-lg font-bold text-slate-800 w-full text-left mb-4">Overall Attendance</h2>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donutData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-slate-800">{overall}%</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4 text-center">Maintain above 75% to be eligible for end-semester exams.</p>
        </div>

        {/* Subject Wise Bars */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 md:col-span-2">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Subject-wise Breakdown</h2>
          <div className="space-y-6">
            {attendanceDetails.map((item, idx) => {
              const percentage = Math.round((item.attended / item.total) * 100);
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">{item.subject}</span>
                    <span className="text-slate-500">{item.attended}/{item.total} classes (<span className={`font-bold ${percentage < 75 ? 'text-red-500' : ''}`}>{percentage}%</span>)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-2.5 rounded-full ${getBarColor(percentage)} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}