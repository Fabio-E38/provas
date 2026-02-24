export enum UserRole {
  Admin = 'Admin',
  Employee = 'Employee',
  Support = 'Support'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string; // Opzionale
}