
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, User, IdCard, MapPin } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  photo: string;
  email: string;
}

interface EmployeeModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isCheckingIn: boolean;
}

const EmployeeModal = ({ employee, isOpen, onClose, onConfirm, isCheckingIn }: EmployeeModalProps) => {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-yellow-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-yellow-400 mb-4">
            {isCheckingIn ? 'Check In Confirmation' : 'Check Out Confirmation'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Employee Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={employee.photo}
                alt={employee.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-yellow-500/50 shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                <Clock className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Employee Details */}
          <div className="space-y-4 bg-slate-800/50 rounded-lg p-4 border border-yellow-500/20">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-300">Employee Name</p>
                <p className="font-semibold text-lg">{employee.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <IdCard className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-300">Employee ID</p>
                <p className="font-semibold">{employee.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-300">Position</p>
                <p className="font-semibold">{employee.position}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-300">Department</p>
                <p className="font-semibold">{employee.department}</p>
              </div>
            </div>
          </div>

          {/* Current Time */}
          <div className="text-center bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg p-3 border border-yellow-500/30">
            <p className="text-sm text-gray-300">Current Time</p>
            <p className="text-xl font-bold text-yellow-400">
              {new Date().toLocaleTimeString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
            >
              Confirm {isCheckingIn ? 'Check In' : 'Check Out'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeModal;
