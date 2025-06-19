
import { Users, Clock, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AttendanceRecord {
  employeeId: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: 'present' | 'absent' | 'checked-out';
}

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  photo: string;
  email: string;
}

interface AdminPanelProps {
  employees: Employee[];
  attendanceRecords: AttendanceRecord[];
}

const AdminPanel = ({ employees, attendanceRecords }: AdminPanelProps) => {
  const totalEmployees = employees.length;
  const presentEmployees = attendanceRecords.filter(record => record.status === 'present').length;
  const checkedOutEmployees = attendanceRecords.filter(record => record.status === 'checked-out').length;
  const absentEmployees = totalEmployees - presentEmployees - checkedOutEmployees;
  const attendanceRate = Math.round(((presentEmployees + checkedOutEmployees) / totalEmployees) * 100);

  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-400/20',
    },
    {
      title: 'Present Today',
      value: presentEmployees,
      icon: Clock,
      color: 'text-green-400',
      bg: 'bg-green-400/20',
    },
    {
      title: 'Checked Out',
      value: checkedOutEmployees,
      icon: TrendingUp,
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/20',
    },
    {
      title: 'Attendance Rate',
      value: `${attendanceRate}%`,
      icon: Award,
      color: 'text-purple-400',
      bg: 'bg-purple-400/20',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-300">Monitor and manage employee attendance</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Breakdown */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Department Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...new Set(employees.map(emp => emp.department))].map(department => {
              const deptEmployees = employees.filter(emp => emp.department === department);
              const deptPresent = deptEmployees.filter(emp => 
                attendanceRecords.find(record => 
                  record.employeeId === emp.id && 
                  (record.status === 'present' || record.status === 'checked-out')
                )
              ).length;
              const deptRate = Math.round((deptPresent / deptEmployees.length) * 100);

              return (
                <div key={department} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-white">{department}</h3>
                    <p className="text-sm text-gray-300">{deptPresent}/{deptEmployees.length} present</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${deptRate}%` }}
                      />
                    </div>
                    <span className="text-yellow-400 font-semibold min-w-[3rem]">{deptRate}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
