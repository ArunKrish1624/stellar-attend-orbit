
export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  photo: string;
  email: string;
}

export interface AttendanceRecord {
  employeeId: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: 'present' | 'absent' | 'checked-out';
}

export const mockEmployees: Employee[] = [
  {
    id: 'EMP001',
    name: 'Sarah Johnson',
    position: 'Senior Developer',
    department: 'Engineering',
    photo: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
    email: 'sarah.johnson@company.com'
  },
  {
    id: 'EMP002',
    name: 'Michael Chen',
    position: 'Project Manager',
    department: 'Management',
    photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
    email: 'michael.chen@company.com'
  },
  {
    id: 'EMP003',
    name: 'Emily Rodriguez',
    position: 'UX Designer',
    department: 'Design',
    photo: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face',
    email: 'emily.rodriguez@company.com'
  },
  {
    id: 'EMP004',
    name: 'David Kim',
    position: 'DevOps Engineer',
    department: 'Engineering',
    photo: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=150&h=150&fit=crop&crop=face',
    email: 'david.kim@company.com'
  },
  {
    id: 'EMP005',
    name: 'Lisa Thompson',
    position: 'HR Manager',
    department: 'Human Resources',
    photo: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=150&h=150&fit=crop&crop=face',
    email: 'lisa.thompson@company.com'
  }
];

export const initialAttendanceRecords: AttendanceRecord[] = [
  {
    employeeId: 'EMP001',
    checkInTime: '09:15 AM',
    checkOutTime: null,
    status: 'present'
  },
  {
    employeeId: 'EMP002',
    checkInTime: '08:45 AM',
    checkOutTime: '05:30 PM',
    status: 'checked-out'
  }
];
