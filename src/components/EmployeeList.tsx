
import { Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface EmployeeListProps {
  employees: Employee[];
  attendanceRecords: AttendanceRecord[];
  onCheckOut: (employeeId: string) => void;
}

const EmployeeList = ({ employees, attendanceRecords, onCheckOut }: EmployeeListProps) => {
  const getAttendanceRecord = (employeeId: string) => {
    return attendanceRecords.find(record => record.employeeId === employeeId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-400 bg-green-400/20';
      case 'checked-out': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Today's Attendance</h2>
        <p className="text-gray-300">Track your team's presence in real-time</p>
      </div>

      <div className="grid gap-4">
        {employees.map((employee) => {
          const attendance = getAttendanceRecord(employee.id);
          const isPresent = attendance?.status === 'present';
          const isCheckedOut = attendance?.status === 'checked-out';

          return (
            <div
              key={employee.id}
              className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
            >
              <div className="flex items-center justify-between">
                {/* Employee Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={employee.photo}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500/50"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${
                      isPresent ? 'bg-green-500' : isCheckedOut ? 'bg-blue-500' : 'bg-gray-500'
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white text-lg">{employee.name}</h3>
                    <p className="text-gray-300 text-sm">{employee.position}</p>
                    <p className="text-gray-400 text-xs">{employee.department}</p>
                  </div>
                </div>

                {/* Attendance Times and Status */}
                <div className="flex items-center space-x-6">
                  {/* Check In Time */}
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">In Time</p>
                    <p className="font-semibold text-green-400">
                      {attendance?.checkInTime || '--:--'}
                    </p>
                  </div>

                  {/* Check Out Time */}
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">Out Time</p>
                    <p className="font-semibold text-blue-400">
                      {attendance?.checkOutTime || '--:--'}
                    </p>
                  </div>

                  {/* Status and Action */}
                  <div className="flex flex-col items-center space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      getStatusColor(attendance?.status || 'absent')
                    }`}>
                      {attendance?.status || 'Absent'}
                    </span>
                    
                    {isPresent && (
                      <Button
                        onClick={() => onCheckOut(employee.id)}
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold"
                      >
                        Check Out
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeList;
