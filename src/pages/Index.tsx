
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, LogIn, LogOut, Shield, Users, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import ThreeBackground from '@/components/ThreeBackground';
import EmployeeModal from '@/components/EmployeeModal';
import EmployeeList from '@/components/EmployeeList';
import AdminPanel from '@/components/AdminPanel';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <ThreeBackground />
      
      {/* Header */}
      <div className="relative z-10">
        <header className="border-b border-yellow-500/20 bg-slate-900/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Building2 className="w-8 h-8 text-yellow-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Enterprise Attendance</h1>
                  <p className="text-gray-300 text-sm">Professional Time Management System</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">
                  {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="attendance" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-yellow-500/20">
              <TabsTrigger 
                value="attendance" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-black font-semibold"
              >
                <Users className="w-4 h-4 mr-2" />
                Employee Attendance
              </TabsTrigger>
              <TabsTrigger 
                value="admin"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-black font-semibold"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Dashboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="attendance" className="space-y-8">
              {/* Attendance Input Section */}
              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-yellow-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-yellow-400 mb-2">
                    Welcome to Your Workplace
                  </CardTitle>
                  <p className="text-gray-300 text-lg">
                    Track your time, manage your presence, excel in your career
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Input
                      placeholder="Enter your Employee ID (e.g., EMP001)"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="max-w-md text-center text-lg bg-slate-700/50 border-yellow-500/30 focus:border-yellow-500 text-white placeholder-gray-400"
                    />
                    
                    <div className="flex space-x-4">
                      <Button
                        onClick={() => handleAttendanceAction(true)}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 text-lg"
                      >
                        <LogIn className="w-5 h-5 mr-2" />
                        Check In
                      </Button>
                      <Button
                        onClick={() => handleAttendanceAction(false)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 text-lg"
                      >
                        <LogOut className="w-5 h-5 mr-2" />
                        Check Out
                      </Button>
                    </div>
                  </div>

                  <div className="text-center text-gray-400 text-sm">
                    <p>Use employee IDs: EMP001, EMP002, EMP003, EMP004, EMP005 for demo</p>
                  </div>
                </CardContent>
              </Card>

              {/* Employee List */}
              <EmployeeList
                employees={mockEmployees}
                attendanceRecords={attendanceRecords}
                onCheckOut={handleQuickCheckOut}
              />
            </TabsContent>

            <TabsContent value="admin">
              <AdminPanel
                employees={mockEmployees}
                attendanceRecords={attendanceRecords}
              />
            </TabsContent>
          </Tabs>
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
