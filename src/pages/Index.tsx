import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, LogIn, LogOut, Building2, Search } from 'lucide-react';
import { toast } from 'sonner';
import ThreeBackground from '@/components/ThreeBackground';
import EmployeeModal from '@/components/EmployeeModal';
import EmployeeList from '@/components/EmployeeList';
import { mockEmployees, initialAttendanceRecords, Employee, AttendanceRecord } from '@/data/mockEmployees';

const Index = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);

  const handleAttendanceAction = (checkIn: boolean) => {
    if (!employeeId.trim()) {
      toast.error('Please enter your Employee ID');
      return;
    }

    const employee = mockEmployees.find(emp => emp.id === employeeId.toUpperCase());
    if (!employee) {
      toast.error('Employee not found. Please check your ID.');
      return;
    }

    const existingRecord = attendanceRecords.find(record => record.employeeId === employee.id);
    
    if (checkIn) {
      if (existingRecord && existingRecord.status === 'present') {
        toast.error('You are already checked in!');
        return;
      }
    } else {
      if (!existingRecord || existingRecord.status !== 'present') {
        toast.error('You need to check in first!');
        return;
      }
    }

    setSelectedEmployee(employee);
    setIsCheckingIn(checkIn);
    setIsModalOpen(true);
  };

  const confirmAttendance = () => {
    if (!selectedEmployee) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setAttendanceRecords(prev => {
      const existingIndex = prev.findIndex(record => record.employeeId === selectedEmployee.id);
      
      if (isCheckingIn) {
        const newRecord: AttendanceRecord = {
          employeeId: selectedEmployee.id,
          checkInTime: currentTime,
          checkOutTime: null,
          status: 'present'
        };
        
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = newRecord;
          return updated;
        } else {
          return [...prev, newRecord];
        }
      } else {
        // Check out
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            checkOutTime: currentTime,
            status: 'checked-out'
          };
          return updated;
        }
      }
      
      return prev;
    });

    toast.success(`Successfully ${isCheckingIn ? 'checked in' : 'checked out'}!`);
    setIsModalOpen(false);
    setSelectedEmployee(null);
    setEmployeeId('');
  };

  const handleQuickCheckOut = (employeeId: string) => {
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
      setIsCheckingIn(false);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      <ThreeBackground />
      
      {/* Modern Header */}
      <div className="relative z-10">
        <header className="bg-white shadow-sm border-b sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">WorkSpace</h1>
                    <p className="text-sm text-gray-500">Attendance Management</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-600">
                <Clock className="w-5 h-5" />
                <div className="text-right">
                  <p className="text-sm font-medium">{new Date().toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 py-8">
            <h2 className="text-4xl font-bold text-gray-900">
              Welcome to Your Workplace
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track your time, manage your presence, and excel in your career with our modern attendance system
            </p>
          </div>

          {/* Attendance Card */}
          <Card className="max-w-2xl mx-auto bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
              <CardTitle className="text-2xl font-bold text-white text-center">
                Employee Check-In/Out
              </CardTitle>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Enter your Employee ID (e.g., EMP001)"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => handleAttendanceAction(true)}
                  className="h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <LogIn className="w-6 h-6 mr-3" />
                  Check In
                </Button>
                <Button
                  onClick={() => handleAttendanceAction(false)}
                  className="h-14 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <LogOut className="w-6 h-6 mr-3" />
                  Check Out
                </Button>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  <strong>Demo Employee IDs:</strong> EMP001, EMP002, EMP003, EMP004, EMP005
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Employee List */}
          <EmployeeList
            employees={mockEmployees}
            attendanceRecords={attendanceRecords}
            onCheckOut={handleQuickCheckOut}
          />
        </main>

        {/* Employee Modal */}
        <EmployeeModal
          employee={selectedEmployee}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmAttendance}
          isCheckingIn={isCheckingIn}
        />
      </div>
    </div>
  );
};

export default Index;
