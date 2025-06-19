
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogOut, Users, Clock, TrendingUp, Award } from 'lucide-react';
import { toast } from 'sonner';
import ThreeBackground from '@/components/ThreeBackground';
import { mockEmployees, initialAttendanceRecords, Employee, AttendanceRecord } from '@/data/mockEmployees';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [attendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/loginadmin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getAttendanceRecord = (employeeId: string) => {
    return attendanceRecords.find(record => record.employeeId === employeeId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Present</span>;
      case 'checked-out':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Checked Out</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Absent</span>;
    }
  };

  const totalEmployees = mockEmployees.length;
  const presentEmployees = attendanceRecords.filter(record => record.status === 'present').length;
  const checkedOutEmployees = attendanceRecords.filter(record => record.status === 'checked-out').length;
  const attendanceRate = Math.round(((presentEmployees + checkedOutEmployees) / totalEmployees) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <ThreeBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Employee Management System</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Employees</p>
                    <p className="text-3xl font-bold text-gray-900">{totalEmployees}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Present Today</p>
                    <p className="text-3xl font-bold text-green-600">{presentEmployees}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Checked Out</p>
                    <p className="text-3xl font-bold text-blue-600">{checkedOutEmployees}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                    <p className="text-3xl font-bold text-purple-600">{attendanceRate}%</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Employee Table */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Employee Attendance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Check In Time</TableHead>
                    <TableHead>Check Out Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEmployees.map((employee) => {
                    const attendance = getAttendanceRecord(employee.id);
                    return (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img
                              src={employee.photo}
                              alt={employee.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{employee.name}</p>
                              <p className="text-sm text-gray-500">{employee.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{employee.position}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <span className="text-green-600 font-medium">
                            {attendance?.checkInTime || '--:--'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-blue-600 font-medium">
                            {attendance?.checkOutTime || '--:--'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(attendance?.status || 'absent')}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
